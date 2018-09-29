import React from 'react';

export default class MimicContainer extends React.Component {
    render() {
        return (
            <svg className="mimic" height="100%" width="100%" preserveAspectRatio="none" >
                {this.props.children}
            </svg>
        );
    }
}