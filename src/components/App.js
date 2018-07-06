import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import * as d3 from 'd3';
import Mimic from './mimic';
// import MimicTree from './mimic/tree';

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

            if(attr.value < result) {
                result = attr.value;
            }

            return result;
        }, 9999);

        var minY = phyllotaxisData.reduce((result, next) => {

            var attr = next.attr.filter(attr => attr.name === 'cy')[0];

            if(attr.value < result) {
                result = attr.value;
            }

            return result;
        }, 9999);

        phyllotaxisData = phyllotaxisData.map(item => {
            item.attr = item.attr.map(attr => {
                if(attr.name === 'cx') {
                    attr.value = attr.value - minX;
                }

                if(attr.name === 'cy') {
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
                            text: 'hello world',
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
        return (
            <div className="app">
                <Mimic width="auto" height="auto" zoom={false} drag={true} data={this.state.data} />
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