import React from 'react';
import * as d3 from 'd3';

export class Weel extends React.Component {
    componentDidMount() {

        const config = {
            container: this.el,
            radius: 100,
            margin: 10,
            info: true,
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

        var height = 2 * fullRadius;
        var width = height;

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
            .attr('class', 'ring')
            .on('mousedown', handleClick);

        var points = weel.append('g')
            .attr('class', 'points')
            .attr('transform', 'translate(' + fullRadius + ',' + fullRadius + ')');

        var info = weel.append('g')
            .attr('class', 'info')
            .attr('transform', 'translate(' + 220 + ',' + 12 + ')');

        info.append('text')
            .attr('class', 'angle')
            .attr('text-anchor', 'end')
            .text(`${0}°`);

        info.append('text')
            .attr('class', 'speed')
            .attr('y', 15)
            .attr('text-anchor', 'end')
            .text(`${0}%`);

        var drag = d3.drag()
            .subject(function (d) { return d; })
            .on("drag", dragmove)
            .on('end', function () {
                d3.select(this).classed('active', false);
            });

        function calcData(d) {

            var coordinates = d3.mouse(weel.node());
            var x = coordinates[0] - fullRadius;
            var y = coordinates[1] - fullRadius;
            var currentRadius = Math.pow(x, 2) + Math.pow(y, 2);

            var angle = Math.atan2(y, x) * 57.2957795;

            if (angle < 0) {
                angle = 360 + angle;
            }

            d.absoluteValue = angularScale.invert(angle);
            d.actualRadius = radius;

            d.isOutside = currentRadius > radiusSquare;

            d.x = d.isOutside ? d.x : x;
            d.y = d.isOutside ? d.y : y;

            return {
                angle,
                currentRadius
            };
        }

        function dragmove(d, i) {

            d3.select(this).classed('active', true);

            const { angle, currentRadius } = calcData(d);

            // Redraw
            drawPoints();
            info.select('.angle').text(`${Math.floor(angle)}°`);
            info.select('.speed').text(`${Math.floor(Math.sqrt(currentRadius))}%`);
        }

        function handleClick(d, i) {

            const { angle, currentRadius } = calcData(data[0]);

            // Redraw
            drawPoints();
            info.select('.angle').text(`${Math.floor(angle)}°`);
            info.select('.speed').text(`${Math.floor(Math.sqrt(currentRadius))}%`);

            var ev = new Event('mousedown');
            ev.view = window;

            var point = points.selectAll('.point');
            point.node().dispatchEvent(ev);
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
                })
                .on('click', () => drawPoints);

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
