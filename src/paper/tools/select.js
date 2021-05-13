import paper from "paper";
import { addToHistory } from "./history";

export const addToolSelect = () => {
    const name = "toolSelect";

    if (paper.tools.find((tool) => tool.name === name)) {
        return;
    }

    var tool = new paper.Tool();
    tool.name = name;
    tool.minDistance = 5;

    var hitOptions = {
        segments: true,
        stroke: true,
        fill: true,
        tolerance: 5,
    };

    var segment, path;
    var movePath = false;

    tool.onMouseDown = function (event) {
        segment = path = null;
        var hitResult = paper.project.hitTest(event.point, hitOptions);

        if (!hitResult) return;

        if (event.modifiers.shift) {
            if (hitResult.type === "segment") {
                hitResult.segment.remove();
            }
            return;
        }

        path = hitResult.item;

        if (hitResult.type === "segment") {
            segment = hitResult.segment;
        } else if (hitResult.type === "stroke") {
            var location = hitResult.location;
            segment = path.insert(location.index + 1, event.point);
            path.smooth();
        }

        movePath = hitResult.type === "fill";

        if (movePath) {
            paper.project.activeLayer.addChild(hitResult.item);
        }
    };

    tool.onMouseMove = (event) => {
        if (event.item) {
            if (event.item.name === "button") {
                return;
            }

            paper.project.activeLayer.selected = false;
            event.item.selected = true;
        }
    };

    tool.onMouseDrag = (event) => {
        if (segment) {
            const to = segment.point.add(event.delta);
            segment.point = to;
            // path.smooth();
        } else if (path) {
            if (path.selected) {
                path.position = path.position.add(event.delta);
            }
        }
    };

    tool.onMouseUp = (event) => {
        if (segment) {
            const from = event.point.subtract(event.delta);
            const to = event.point;

            addToHistory({
                key: "segment.point",
                payload: {
                    segment,
                    from,
                    to,
                },
            });
        }
    };
};
