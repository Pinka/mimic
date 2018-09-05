import React from 'react';
// import * as d3 from 'd3';

// import './style.css';

export default class Mimic extends React.Component {
  render() {
      // width={this.props.width} height={this.props.height}
    return (
        <svg className="mimic"  height="100%" width="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none" >
          {this.props.children}
        </svg>
    );
  }
}
