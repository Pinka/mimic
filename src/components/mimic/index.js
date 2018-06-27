import * as React from 'react';
import * as d3 from 'd3';
// import ResizeDetector from 'element-resize-detector';

class Mimic extends React.Component {
  constructor(props) {
    super(props);

    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.useZoom = this.useZoom.bind(this);
    this.useDrag = this.useDrag.bind(this);

    this.getWidth = this.getWidth.bind(this);
    this.getHeight = this.getHeight.bind(this);
    // this.initDrag = this.initDrag.bind(this);
  }
  componentDidCatch(err, stack) {
    alert(err, stack);
  }
  componentDidMount() {

    this.useZoom(this.props.zoom);
    this.useDrag(this.props.drag);
    this.init(this.props.data);
  }
  componentWillReceiveProps(newProps) {
    this.update(newProps.data);
  }
  useDrag(state) {

    if (state !== false) {

    }
  }
  useZoom(state) {

    var svg = d3.select(this.svg);
    var g = svg.select("g");

    if (state !== false) {
      var zoomed = function () {
        g.attr("transform", d3.event.transform);
      };

      svg.call(d3.zoom()
        .scaleExtent([1 / 2, 8])
        .on("zoom", zoomed));
    }
  }
  dragged(d) {
    if (this.tagName === "g") {
      d.x = d3.event.x;
      d.y = d3.event.y;
      d3.select(this).attr("transform", `translate(${d.x}, ${d.y})`);//d3.event.transform
    }
    else {
      d3.select(this).attr("cx", d.cx = d3.event.x).attr("cy", d.cy = d3.event.y);
    }
  }
  init(data) {

    var svg = d3.select(this.svg);

    data.forEach(mimic => {

      var elements = svg
        .select('#' + mimic.id)
        .selectAll('*');

      elements.each(function (d, i) {

        var elementData = mimic.data[i];
        if (elementData) {

          var transition = d3.select(this)
            .data([elementData])
            .transition();

          Object.keys(elementData).map(key => {
            transition.attr(key, function (d) {
              return d[key];
            });
          });

          transition.duration(250);
        }
      });

      // elements.call(d3.drag().on("drag", this.dragged));
    });
  }
  update(data) {
    this.init(data);
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
      <div ref={r => { this.container = r }} className="mimic-view">
        <svg ref={r => { this.svg = r }} className="mimic" width={this.getWidth()} height={this.getHeight()}>
          {React.Children.map(content.props.children, (element, idx) => {
            return React.cloneElement(element, { ref: idx });
          })}
        </svg>
      </div>
    );
  }
}

export default Mimic;