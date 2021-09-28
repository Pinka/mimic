import paper from 'paper';
import faker from 'faker';
import * as htmlToImage from 'html-to-image';

export const defaultFillColor = 'rgba(0,0,0,0.87)';
export const defaultStrokeColor = 'rgba(0,0,0,0.87)';

export const MIMIC_LAYER_NAME = "MIMIC_LAYER";

const sorageUrl = 'https://9tvgcnacn7.execute-api.eu-central-1.amazonaws.com/default/mimic';

export const initCanvas = (canvas) => {
    paper.setup(canvas);
};

export const bind = () => {

    getItems()
        .forEach(async item => {

            if (item.data.type === 'rest') {

                const res = await fetch(item.data.url)
                    .then((response) => response.json());

                const value = get(res, item.data.sourceKey);
                set(item, item.data.destKey, value);
            }
        });
};

export const onAction = (action) => {
    // console.log("on Action:", action);

    const { item, itemName, values } = action.payload;

    const processAction = (item) => {
        if (action.type === "update") {
            updateItem(item, values);
        }
    };

    if (itemName) {
        paper.project.getItems({
            name: itemName
        }).forEach(item => {
            processAction(item);
        });
    }

    if (item) {
        processAction(item);
    }
};

export const useTool = (name) => {
    const tool = paper.tools.find(tool => tool.name === name)
    tool.activate()
}

export const getItems = () => {
    return paper.project?.activeLayer.getItems() ?? [];
};

export const getItemsByName = (name) => {
    return paper.project.getItems({
        match: (item) => (item.name || "").indexOf(name) === 0
    });
};

export const updateItem = function (item, values) {

    if (values.position && item.position) {

        const x = values.position.x || item.position.x;
        const y = values.position.y || item.position.y;
        const newPosition = new paper.Point(x, y);

        item.tweenTo(
            { 'position': newPosition },
            300
        );
    }

    if (values.point && item.point) {

        const x = values.point.x || item.point.x;
        const y = values.point.y || item.point.y;
        const newPoint = new paper.Point(x, y);

        item.point = newPoint;
    }

    if (values.content && item.content) {
        item.content = values.content;
    }

    const excludedValues = ["position", "point", "content"];

    Object.keys(values)
        .filter(key => !excludedValues.includes(key))
        .forEach(key => {

            if (item[key] !== undefined) {
                item.tweenTo(
                    { [key]: values[key] },
                    300
                );
            }
        });

    return item;
};

export const addBinding = ({ itemName, item, binding }) => {

    const defaultBinding = {
        type: 'rest',
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        sourceKey: 'title',
        destKey: 'content'
    };

    const bindItem = (item) => {
        item.data = {
            ...item.data,
            ...defaultBinding,
            ...binding
        };
    };

    if (itemName) {
        paper.project.getItems({
            name: itemName
        })
            .forEach(item => {
                bindItem(item);
            })
    }

    if (item) {
        bindItem(item);
    }
};

export const addLine = () => {

    const name = "line";
    const path = new paper.Path();
    path.strokeColor = defaultStrokeColor;
    path.strokeWidth = 2;
    path.name = name + getItemsByName(name).length;

    const start = new paper.Point(100, 100);
    path.moveTo(start);
    path.lineTo(start.add([200, -50]));

    paper.project.activeLayer.selected = false;
    path.selected = true;
};

export const addCircle = () => {

    const name = "circle";
    const path = new paper.Path.Circle(new paper.Point(100, 100), 50);

    path.fillColor = defaultFillColor;
    path.strokeColor = defaultStrokeColor;
    path.strokeWidth = 2;
    path.closed = true;
    path.name = name + getItemsByName(name).length;

    paper.project.activeLayer.selected = false;
    path.selected = true;
};

export const addRect = () => {

    const name = "rect";
    const path = new paper.Path.Rectangle(0, 0, 100, 100);

    path.fillColor = defaultFillColor;
    path.strokeColor = defaultStrokeColor;
    path.strokeWidth = 2;
    path.closed = true;
    path.name = name + getItemsByName(name).length;

    paper.project.activeLayer.selected = false;
    path.selected = true;
};

export const addText = (props) => {

    const name = "text";
    const point = props.point || new paper.Point(100, 100);
    const content = props.content || "Text";

    const text = new paper.PointText(point);
    text.justification = 'center';
    text.fillColor = 'black';
    text.strokeWidth = 2;
    text.content = content;
    text.name = name + getItemsByName(name).length;

    text.onClick = props.onClick;

    return text;
};

export const addGrid = () => {

    var prevLayer = paper.project.activeLayer;

    const gridConfig = {
        color: 'rgba(0,0,0,0.11)',
        width: paper.view.viewSize.width,
        height: paper.view.viewSize.height
    };

    const drawLine = (segments) => {

        const path = new paper.Path(segments);
        path.strokeColor = 'rgba(0,0,0,0.21)';
        path.strokeWidth = 1;
        path.locked = true;

        return path;
    };

    const drawGridVerticalLines = ({
        color,
        width,
        height
    }) => {

        let lines = [];

        for (var i = 0; i < width; i++) {

            if (i % 10 === 0) {
                var a = new paper.Point(i, 0);
                var b = new paper.Point(i, height);
                var segments = [a, b];
                var line = drawLine(segments);

                line.strokeColor = color;
                line.strokeWidth = i % 50 === 0 ? 2 : 1;

                lines.push(line);
            }
        }

        return lines;
    }

    const drawGridHorizontalLines = ({
        color,
        width,
        height
    }) => {

        let lines = [];

        for (var i = 0; i < height; i++) {

            if (i % 10 === 0) {

                var a = new paper.Point(0, i);
                var b = new paper.Point(width, i);
                var segments = [a, b];
                var line = drawLine(segments);

                line.strokeColor = color;
                line.strokeWidth = i % 50 === 0 ? 2 : 1;

                lines.push(line);
            }
        }

        return lines;
    }

    var gridLayer = new paper.Layer();
    gridLayer.name = "grid-layer";

    drawGridVerticalLines(gridConfig);
    drawGridHorizontalLines(gridConfig);

    prevLayer.activate();
};

export const createNew = async () => {

    const mimicName = faker.random.words();
    const mimicLayer = getMimicLayer();

    mimicLayer.clear();
    mimicLayer.data = {
        mimicName
    };
};

export const save = async () => {

    const mimicLayer = getMimicLayer();

    const name = mimicLayer.data.mimicName ?? faker.random.words();
    const config = mimicLayer.exportJSON();

    localStorage.setItem('project', config);
    localStorage.setItem('projectName', name);

    const data = {
        name,
        config
    };

    try {
        await fetch(sorageUrl, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'wL5upgCpe33dj3Ozu1Ron2x9PFnzlE4S7DXh8DH6',
            },
            body: JSON.stringify(data)
        });
    }
    catch (error) {
        console.log("Save mimic error", error);
    }
};

export const load = async () => {

    let mimicLayer = getMimicLayer();
    const config = localStorage.getItem('project');
    const mimicName = localStorage.getItem('projectName') ?? faker.random.words();

    if (config) {

        if (!mimicLayer) {
            mimicLayer = paper.project.addLayer(new paper.Layer());
            mimicLayer.name = MIMIC_LAYER_NAME;
            mimicLayer.activate();
        }

        mimicLayer.data = {
            mimicName
        };

        mimicLayer.importJSON(config);
    }
};

export const getMimicsList = async () => {

    try {

        const response = await fetch(sorageUrl, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'wL5upgCpe33dj3Ozu1Ron2x9PFnzlE4S7DXh8DH6',
            }
        });

        const mimics = await response.json();
        console.log("Mimics loaded", mimics);

        return mimics;
    }
    catch (error) {
        console.log("Mimics load error", error);
    }
};

export const getMimicLayer = () => {
    return paper.project?.layers[MIMIC_LAYER_NAME];
};

export const getMimicName = () => {
    return getMimicLayer()?.data.mimicName;
};

export const takeScreenshot = (element) => {
    htmlToImage.toPng(element ?? document.getElementById("root"))
        .then(function (dataUrl) {
            var link = document.createElement("a");
            link.href = dataUrl;
            link.download = 'screenshot.png';
            link.click();
        });
};

export const get = (obj = this, path, separator = '.') => {
    var properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev, curr) => prev && prev[curr], obj)
};

function set(obj, path, value) {

    if (!path) {
        return;
    }

    if (typeof path === "string") {
        path = path.split('.');
    }

    if (path.length > 1) {
        var p = path.shift();
        if (obj[p] == null || typeof obj[p] !== 'object') {
            obj[p] = {};
        }
        set(obj[p], path, value);
    } else {
        obj[path[0]] = value;
    }
};
