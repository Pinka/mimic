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

        //mimic data
        this.state = {
            data: [
                {
                    id: "phyllotaxis",
                    data: d3
                        .range(100)
                        .map(this.phyllotaxis(10))
                }
            ]
        };

        this.view = (
            <svg>
                {this.state.data.map((mimic, mimicIndex) =>
                    <g id={mimic.id} key={mimicIndex}>
                        {mimic.data.map((d, i) => <circle r="2.5" cx={d.cx} cy={d.cy} key={i}></circle>)}
                    </g>
                )}
            </svg>
        );
    }
    componentDidMount() {
        this.simulateDataChange();
    }
    render() {
        return (
            <div className="app">
                <Mimic width="auto" height="auto" zoom={true} drag={true} data={this.state.data} view={this.view} >
                    <g>
                        <line x1="0" y1="80" x2="100" y2="20" stroke="black" />
                    </g>
                </Mimic>
            </div>
        );
    }
    phyllotaxis(radius) {
        var theta = Math.PI * (3 - Math.sqrt(5));
        return function (i, index) {
            var r = radius * Math.sqrt(i), a = theta * i;
            return {
                cx: 500 / 2 + r * Math.cos(a) + 200,
                cy: 300 / 2 + r * Math.sin(a)
            };
        };
    }
    simulateDataChange() {
        setInterval(() => {

            var newX = this.state.data[0].data[0].cx + (Math.random() * 33 * (Math.random() > 0.5 ? -1 : 1));
            var newY = this.state.data[0].data[0].cy + (Math.random() * 44 * (Math.random() > 0.5 ? -1 : 1));

            var data = [
                {
                    id: 'phyllotaxis',
                    data: [
                        {
                            cx: newX,
                            cy: newY
                        }
                    ]
                }
            ];

            this.setState({
                data: data
            });

        }, 1000);
    }
}

export default App;