import * as React from 'react';
import * as d3 from 'd3';
import * as ResizeDetector from 'element-resize-detector';

class Mimic extends React.Component {
  constructor(props) {
    super(props);

    this.getWidth = this.getWidth.bind(this);
    this.getHeight = this.getHeight.bind(this);
    // this.initDrag = this.initDrag.bind(this);
  }
  componentDidCatch(err, stack) {
    alert(err, stack);
  }
  componentDidMount() {

    var svg = d3.select(this.svg);
    var g = svg.select("g");

    if (this.props.zoom !== false) {
      var zoomed = function () {
        g.attr("transform", d3.event.transform);
      };

      svg.call(d3.zoom()
        .scaleExtent([1 / 2, 8])
        .on("zoom", zoomed));
    }

    if (this.props.drag !== false) {
      var dragged = function (d) {

        if(this.tagName === "g") {
          d.x = d3.event.x;
          d.y = d3.event.y;
          d3.select(this).attr("transform", `translate(${d.x}, ${d.y})`);//d3.event.transform
        }
        else {
          d3.select(this).attr("cx", d.cx = d3.event.x).attr("cy", d.cy = d3.event.y);
        }
      };

      var data = this.props.data;

      svg
        .selectAll("circle")
        .data(data)
        .call(d3.drag()
          .on("drag", dragged));
// debugger;

      var mimicTrees = svg
        .selectAll(".mimic-tree");

      //var transform = mimicTrees._groups[0][0].attr("transform");
      //var components = d3.transform(mimicTrees);

      mimicTrees
        .data([{id: 'tree', x: 0, y: 10}])
        .call(d3.drag()
          .on("drag", dragged));
    }

    var erd = ResizeDetector.default({
      strategy: "scroll" //<- For ultra performance.
    });

    erd.listenTo(this.container, element => {
      this.forceUpdate();
    });
  }
  getWidth() {

    var width = this.props.width;

    if (this.props.width === "auto") {
      width = this.container ? this.container.offsetWidth : 0;
    }

    return width;
  }
  getHeight() {

    var height = this.props.height;

    if (this.props.height === "auto") {
      height = this.container ? this.container.offsetHeight : 0;
    }

    return height;
  }
  render() {

    var content = this.props.view || this.props.children;

    return (
      <div ref={r => { this.container = r }} className="mimic">
        <svg ref={r => { this.svg = r }} className="mimic-view" width={this.getWidth()} height={this.getHeight()}>
          <g>
          {React.Children.map(content.props.children, (element, idx) => {
            return React.cloneElement(element, { ref: idx });
          })}
          </g>
        </svg>
      </div>
    );
  }
}

export default Mimic;