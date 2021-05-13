import paper from 'paper';

export const addToolPan = () => {

    const name = "toolPan";

    if (paper.tools.find(tool => tool.name === name)) {
        return;
    }

    var toolPan = new paper.Tool();
    toolPan.name = name;

    toolPan.onMouseDrag = function (event) {
    	var offset = event.downPoint.subtract(event.point)
    	paper.view.center = paper.view.center.add(offset);
    };
}
