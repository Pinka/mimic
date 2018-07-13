
import * as React from 'react';
import Chart from 'chart.js';


class ChartJs extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {

        var data = {
            datasets: [{
                data: [54, 6]
            }],
        };

        var options = {
            cutoutPercentage: 70,
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI
        };

        var myPieChart = new Chart(this.container, {
            type: 'doughnut',
            data: data,
            options: options
        });
    }
    render() {
        return (
            <div style={{ width: 400, height: 200, position: 'relative' }}>
                <canvas ref={r => { this.container = r }}></canvas>
                <div className="label" style={{position: 'absolute', bottom: 0, width: '100%', textAlign: 'center'}}>{this.props.value}</div>
            </div>
        );
    }
}

export default ChartJs;