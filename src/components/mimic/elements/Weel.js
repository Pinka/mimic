import React from 'react';
import * as d3 from 'd3';

{/* <g id="weel" /> */ }
export class Weel extends React.Component {
    componentDidMount() {

        const config = {
            container: this.el,
            radius: 100,
            margin: 10,
            panel: true,
            outerPointer: true,
            ...this.props
        };

        this.drawWeel(config);
    }
    drawWeel(config) {

        const { container, radius, outerPointer, margin } = config;
        const radiusSquare = Math.pow(radius, 2);

        var domainMax = 1;
        var fullRadius = radius + margin;
        var width = 2 * fullRadius;
        var height = width;
        

        var data = [{
            absoluteValue: 0,
            x: 0,
            y: 0,
            radius: radius
        }];

        var angularScale = d3
            .scaleLinear()
            .range([0, 360])
            .domain([0, domainMax]);

        var weel = d3.select(container)
            .attr('class', 'weel')
            .attr('width', width)
            .attr('height', height)
            .attr('transform', 'translate(' + 0 + ',' + 0 + ')');

        var ring = weel.append('g')
            .attr('class', 'ring')
            .attr('transform', 'translate(' + fullRadius + ',' + fullRadius + ')');

        ring.append('circle')
            .attr("r", radius)
            .attr("fill", "transparent")
            .attr("stroke", "black")
            .attr('class', 'ring');

        var points = weel.append('g')
            .attr('class', 'points')
            .attr('transform', 'translate(' + fullRadius + ',' + fullRadius + ')');

        var drag = d3.drag()
            .subject(function (d) { return d; })
            .on("drag", dragmove)
            .on('end', function () {
                d3.select(this).classed('active', false);
            });

        function dragmove(d, i) {

            d3.select(this).classed('active', true);

            var coordinates = d3.mouse(weel.node());
            var x = coordinates[0] - fullRadius;
            var y = coordinates[1] - fullRadius;

            var newAngle = Math.atan2(y, x) * 57.2957795;

            if (newAngle < 0) {
                newAngle = 360 + newAngle;
            }

            d.absoluteValue = angularScale.invert(newAngle);
            d.actualRadius = radius;

            d.isOutside = (Math.pow(x, 2) + Math.pow(y, 2)) > radiusSquare;

            d.x = d.isOutside ? d.x : x;
            d.y = d.isOutside ? d.y : y;

            console.log(x, y, d.isOutside);

            // Redraw
            drawPoints();
        }

        drawPoints();

        function drawPoints() {

            var outerPoint = points.selectAll('.outer')
                .data(data);

            outerPoint.enter()
                .append('circle')
                .attr("r", 10)
                .attr("class", "outer")
                .on("mouseover", function () {
                    d3.select(this).classed('active', true);
                })
                .on("mouseout", function () {
                    d3.select(this).classed('active', false);
                })
                .attr("transform", function (d) {
                    return 'translate(' + radius + ',0)'
                })
                .style("opacity", function (d) {
                    return outerPointer || d.isOutside ? 1 : 0;
                })
                .call(drag);

            outerPoint
                .attr("transform", function (d) {
                    return 'rotate(' + angularScale(d.absoluteValue) + ') translate(' + radius + ',0)';
                })
                .style("opacity", function (d) {
                    return outerPointer || d.isOutside ? 1 : 0;
                });

            var innerPoint = points.selectAll('.point')
                .data(data);

            innerPoint
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                })
                .style("opacity", function (d) {
                    return d.isOutside ? 0 : 1;
                })
                .enter()
                .append('circle')
                .attr("r", 10)
                .attr("class", "point")
                .attr("transform", function (d) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                })
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                })
                .on("mouseover", function () {
                    d3.select(this).classed('active', true);
                })
                .on("mouseout", function () {
                    d3.select(this).classed('active', false);
                })
                .call(drag);
        }
    }
    render() {
        return (
            <svg ref={r => { this.el = r }} preserveAspectRatio="none" />
        );
    }
}
