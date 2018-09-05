import React from 'react';
import * as d3 from 'd3';

{/* <g id="weel" /> */ }
export class PieChart extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

        var config = {
            el: this.svg,
            data: this.props.data,
            labels: this.props.labels
        };

        this.drawAnimatedRingChart(config);
    }
    drawAnimatedRingChart(config) {

        var maxWidth = 200;
        var maxHeight = 200;
        var ringWidth = 20;
        var outerRadius = 100;
        var innerRadius = outerRadius - ringWidth;

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var pie = d3.pie().value(function (d) {
            return d.value;
        });

        var arc = d3.arc();

        arc.outerRadius(config.outerRadius || outerRadius)
            .innerRadius(config.innerRadius || innerRadius);

        var el = d3.select(this.el);

        // Remove the previous ring
        el.selectAll('g').remove();
        el.attr("width", maxWidth);
        el.attr("height", maxHeight);

        // Add the groups that will hold the arcs
        var groups = el.selectAll('g.arc')
            .data(pie(config.data)) // Data binding
            .enter()
            .append('g')
            .attr("class", "arc")
            .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

        groups.append('path')
            .attr("fill", function (d, i) {
                return color(i);
            })
            .transition()
            .duration(config.duration || 1000)
            .attrTween('d', tweenPie);

        if (config.labels) {
            groups.append('text')
                .attr("text-anchor", "middle")
                .attr("transform", function (d) {
                    return 'translate(' + arc.centroid(d) + ')';
                })
                .text(function (d) {
                    // Notice the usage of d.data to access the raw data item
                    return d.data.label;
                });
        }

        if (config.pointer) {

        }

        function tweenPie(finish) {
            var start = {
                startAngle: 0,
                endAngle: 0
            };
            var interpolator = d3.interpolate(start, finish);
            return function (d) { return arc(interpolator(d)); };
        }
    }
    render() {
        return (
            <g ref={r => { this.el = r }} />
        );
    }
}
