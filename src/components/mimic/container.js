import React from 'react';
// import './style.css';

export default class MimicContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <svg className="mimic" height="100%" width="100%" preserveAspectRatio="none" >
                {this.props.children}
            </svg>
        );
    }
}