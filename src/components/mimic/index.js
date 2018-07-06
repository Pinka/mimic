import * as React from 'react';
import * as d3 from 'd3';
// import ResizeDetector from 'element-resize-detector';

import './style.css';

class Mimic extends React.Component {
  constructor(props) {
    super(props);

    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.useZoom = this.useZoom.bind(this);
    this.useDrag = this.useDrag.bind(this);

    this.getWidth = this.getWidth.bind(this);
    this.getHeight = this.getHeight.bind(this);
  }
  componentDidCatch(err, stack) {
    alert(err, stack);
  }
  componentDidMount() {

    this.init(this.props.data);

    this.useZoom(this.props.zoom);
    this.useDrag(this.props.drag);

    this.update(this.props.data);
  }
  componentWillReceiveProps(newProps) {
    this.update(newProps.data);
  }
  useDrag(state) {

    if (state === true) {
      d3.select(this.svg)
        .selectAll('.mc')
        .on("mouseover", this.mouseOver)
        .on("mouseout", this.mouseOut)
        .call(d3.drag()
          //.on("start", this.dragstarted)
          .on("drag", this.dragged));
          //.on("end", this.dragended));
    }
  }
  useZoom(state) {

    var svg = d3.select(this.svg);
    var g = svg.select("g");

    if (state === true) {
      var zoomed = function () {
        g.attr("transform", d3.event.transform);
      };

      svg.call(d3.zoom()
        .scaleExtent([1 / 2, 8])
        .on("zoom", zoomed));
    }
  }
  mouseOver() {
    if (this.tagName === "g") {
      d3.select(this).raise().classed("active", true);
    }
  }
  mouseOut() {
    if (this.tagName === "g") {
      d3.select(this).classed("active", false);
    }
  }
  dragged(d) {
    if (this.tagName === "g") {
      d.x = d3.event.x;
      d.y = d3.event.y;
      d3.select(this).attr("transform", `translate(${d.x}, ${d.y})`);
    }
  }
  init(data) {

    d3.select(this.svg)
      .selectAll('.mc')
      .data(data)
      .enter()
      .append(function (d, i) {

        var element = document.createElementNS("http://www.w3.org/2000/svg", d.name || 'g');
        var selection = d3.select(element);

        return selection.node();
      })
      .attr("id", function (d) {
        return d.id;
      })
      .attr("class", "mc")
      .attr("transform", function(d) {
        return `translate(${d.x}, ${d.y})`;
      })
      .selectAll('.mc-el')
      .data(function (d, i) {
        return data[i].data
      })
      .enter()
      .append(function (d, i) {

        var element = document.createElementNS("http://www.w3.org/2000/svg", d.name);
        var selection = d3.select(element)

        if(d.text) {
          selection.text(d.text);
        }

        return selection.node();
      })
      .attr("id", function (d, i) {
        return d.id;
      })
      .attr("class", "mc-el");
  }
  update(data) {

    d3.select(this.svg)
      .selectAll('.mc')
      .data(data)
      .selectAll('.mc-el')
      .data(function (d, i) {
        return data[i].data
      })
      .each(function (d) {

        var transition = d3
          .select(this)
          .transition();

        d.attr.forEach((attr, i) => {
          transition.attr(attr.name, function (d) {
            return d.attr[i].value;
          });
        });

        if(d.text) {
          transition.text(function (d) {
            return d.text;
          });
        }

        transition.duration(250);
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
    return (
      <div ref={r => { this.container = r }} className="mimic-view">
        <svg ref={r => { this.svg = r }} className="mimic" width={this.getWidth()} height={this.getHeight()} />
      </div>
    );
  }
}

export default Mimic;