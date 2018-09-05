// import * as ReactDOM from 'react-dom';
import * as d3 from 'd3';
import * as React from 'react';
import Mimic from './mimic/core';
import MimicContainer from './mimic/container';
import { Line } from './mimic/elements/line';
import { Weel } from './mimic/elements/Weel';
import { PieChart } from './mimic/elements/PieChart';
import './style.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.simulateDataChange = this.simulateDataChange.bind(this);

        var phyllotaxisData = d3
            .range(100)
            .map(this.phyllotaxis(10));

        var minX = phyllotaxisData.reduce((result, next) => {

            var attr = next.attr.filter(attr => attr.name === 'cx')[0];

            if (attr.value < result) {
                result = attr.value;
            }

            return result;
        }, 9999);

        var minY = phyllotaxisData.reduce((result, next) => {

            var attr = next.attr.filter(attr => attr.name === 'cy')[0];

            if (attr.value < result) {
                result = attr.value;
            }

            return result;
        }, 9999);

        phyllotaxisData = phyllotaxisData.map(item => {
            item.attr = item.attr.map(attr => {
                if (attr.name === 'cx') {
                    attr.value = attr.value - minX;
                }

                if (attr.name === 'cy') {
                    attr.value = attr.value - minY;
                }

                return attr;
            });

            return item;
        });


        //mimic data
        this.state = {
            data: [
                {
                    id: "phyllotaxis",
                    x: minX,
                    y: minY,
                    data: phyllotaxisData
                },
                {
                    id: 'square',
                    x: 20,
                    y: 80,
                    data: [
                        {
                            name: 'text',
                            id: 't0',
                            text: 'HELLO WORLD',
                            attr: [
                                {
                                    name: 'color',
                                    value: 'green'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
    componentDidMount() {
        this.simulateDataChange();
    }
    render() {

        var weelData = [
            { label: 'A', value: 100 }
        ];

        var fourPartsPie = [
            { label: 'A', value: 50 },
            { label: 'B', value: 50 },
            { label: 'C', value: 50 },
            { label: 'D', value: 50 }
        ];

        var samplePie = [
            { label: 'A', value: 22 },
            { label: 'B', value: 66 },
            { label: 'C', value: 25 },
            { label: 'D', value: 50 },
            { label: 'E', value: 27 }
        ];

        return (
            <div className="app hero is-fullheight">
                <div className="hero-head"/>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <Weel onSteer={this.onSteer} />
                    </div>
                </div>
                <div className="hero-foot"/>
            </div>
        );
    }
    phyllotaxis(radius) {
        var theta = Math.PI * (3 - Math.sqrt(5));
        return function (i, index) {
            var r = radius * Math.sqrt(i), a = theta * i;
            return {
                name: 'circle',
                id: 'c' + i,
                attr: [
                    {
                        name: 'cx',
                        value: 500 / 2 + r * Math.cos(a)
                    },
                    {
                        name: 'cy',
                        value: 300 / 2 + r * Math.sin(a)
                    },
                    {
                        name: 'r',
                        value: 2.5
                    }
                ]
            };
        };
    }
    simulateDataChange() {
        setInterval(() => {

            var data = this.state.data.map(mimic => {

                var xx = Math.floor(Math.random() * 4);
                mimic.data.forEach((el, i) => {

                    if (i % xx > 0) {
                        el.attr = el.attr.map(attr => {

                            switch (attr.name) {
                                // case 'cx':
                                //     attr.value = attr.value + (Math.random() * 48 * (Math.random() > 0.5 ? -1 : 1));
                                //     break;
                                // case 'cy':
                                //     attr.value = attr.value + (Math.random() * 64 * (Math.random() > 0.5 ? -1 : 1));
                                //     break;
                                case 'r':
                                    attr.value = Math.random() * 8;
                                    break;

                            }

                            return attr;
                        });
                    }

                    return el;
                });

                return mimic;
            });

            this.setState({
                data: data
            });

        }, 1000);
    }
}

export default App;