import * as React from 'react';
import Mimic from '../mimic';

class MimicControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: "auto",
            height: "auto",
            zoom: true
        };
    }
    componentDidCatch(err, stack) {
        alert(err, stack);
    }
    componentDidMount() {}
    render() {
        return (
            <div className="mimic-control">
                <Mimic 
                    width={this.state.width} 
                    height={this.state.height} 
                    zoom={this.state.zoom} 
                    view={this.props.view} 
                    data={this.props.data} />
            </div>
        );
    }
}

export default MimicControl;