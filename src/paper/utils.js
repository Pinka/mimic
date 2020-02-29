import paper from 'paper';

export const defaultFillColor = 'rgba(0,0,0,0.87)';
export const defaultStrokeColor = 'rgba(0,0,0,0.87)';

export const initCanvas = (canvas) => {
    paper.setup(canvas);
};

export const bind = () => {
// debugger;
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

export const save = () => {
    const json = paper.project.activeLayer.exportJSON();
    localStorage.setItem('project', json);
};

export const load = () => {
    const json = localStorage.getItem('project');
    if (json) {
        // paper.project.clear();
        paper.project.activeLayer.importJSON(json)
    }
};


export const get = (obj = this, path, separator = '.') => {
    var properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev, curr) => prev && prev[curr], obj)
};

function set(obj, path, value) {

    if(!path) {
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