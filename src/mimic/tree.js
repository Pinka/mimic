import * as React from 'react';
import * as d3 from 'd3';

class MimicTree extends React.Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.initTree2 = this.initTree2.bind(this);
    }
    componentDidMount() {
        this.init();
    }
    init() {

        var i = 0,
            duration = 400;

        var diagonal = d3.linkHorizontal()
            .x(function (d) { return d.y; })
            .y(function (d) { return d.x; });

        var tree = d3.select(this.container);

        var offsetX = this.props.x || 0;
        var offsetY = this.props.y || 0;

        var data = this.props.data
            .map(item => {

                var items = [item];

                if (item.data) {
                    items = items.concat(
                        Object.keys(item.data)
                            .map(key => {
                                return {
                                    id: item.id + key,
                                    parentId: item.id,
                                    name: key + ': ' + item.data[key]
                                };
                            })
                    );
                }


                return items;
            })
            .reduce((result, item) => {
                return result.concat(item);
            }, []);

        var root = d3.stratify()(data);

        // set start position
        root.x0 = 0;
        root.y0 = 0;

        collapse(root);
        update(root);

        function collapse(el) {

            if (el.children) {
                el.children.forEach(collapse);
            }

            el._children = el.children;
            el.children = null;
        }

        function update(source) {

            // Compute the flattened node list.
            var nodes = root.descendants();

            var barHeight = 20;
            var barWidth = 200;
            var margin = { top: 30, right: 20, bottom: 30, left: 20 };

            var height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);

            tree
                .transition()
                .duration(duration)
                .attr("height", height);
            
                tree
                .attr("transform", `translate(${offsetX},${offsetY})`);

            d3.select(self.frameElement).transition()
                .duration(duration)
                .style("height", height + "px");

            // Compute the "layout". TODO https://github.com/d3/d3-hierarchy/issues/67
            var index = -1;
            root.eachBefore(function (n) {
                n.x = ++index * barHeight;
                n.y = n.depth * 20;
            });

            // Update the nodes…
            var node = tree.selectAll(".node")
                .data(nodes, function (d) { return d.id || (d.id = ++i); });

            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function (d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .style("opacity", 0);

            // Enter any new nodes at the parent's previous position.
            nodeEnter.append("rect")
                .attr("y", -barHeight / 2)
                .attr("height", barHeight)
                .attr("width", barWidth)
                .style("fill", color)
                .on("click", click);

            nodeEnter.append("text")
                .attr("dy", 3.5)
                .attr("dx", 5.5)
                .text(function (d) { return d.data.name || d.data.id; });

            // Transition nodes to their new position.
            nodeEnter.transition()
                .duration(duration)
                .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
                .style("opacity", 1);

            node.transition()
                .duration(duration)
                .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
                .style("opacity", 1)
                .select("rect")
                .style("fill", color);

            // Transition exiting nodes to the parent's new position.
            node.exit().transition()
                .duration(duration)
                .attr("transform", function (d) { return "translate(" + source.y + "," + source.x + ")"; })
                .style("opacity", 0)
                .remove();

            // Update the links…
            var link = tree.selectAll(".link")
                .data(root.links(), function (d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function (d) {
                    var o = { x: source.x0, y: source.y0 };
                    return diagonal({ source: o, target: o });
                })
                .transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function (d) {
                    var o = { x: source.x, y: source.y };
                    return diagonal({ source: o, target: o });
                })
                .remove();

            // Stash the old positions for transition.
            root.each(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        // Toggle children on click.
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }

            update(d);
        }

        function color(d) {
            return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
        }
    }
    initTree2(data) {

        var tree = d3.tree()
            .size([this.props.height, this.props.width]);

        var g = d3.select(this.container);

        var link = g.selectAll(".link")
            .data(tree(root).links())
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d3.linkHorizontal()
                .x(function (d) { return d.y; })
                .y(function (d) { return d.x; }));

        var node = g.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", function (d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })

        node.append("circle")
            .attr("r", 2.5);

        node.append("text")
            .attr("dy", 3)
            .attr("x", function (d) { return d.children ? -8 : 8; })
            .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
            .text(function (d) { return d.id; });
    }
    render() {
        return (
            <g ref={r => this.container = r} className="mimic-tree" />
        );
    }
}

export default MimicTree;