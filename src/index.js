import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as d3 from 'd3';
import Mimic from './mimic';

//mimic data
var width = "auto";//500;//"auto";
var height = "auto";//300;//"auto";
var data = d3.range(200).map(phyllotaxis(10));
function view(viewData) {
  return (
      <svg>
        <g>
          {
            viewData.map((d, i) => <circle r="2.5" cx={d.cx} cy={d.cy} key={i}></circle>)
          }
        </g>
      </svg>
  );
}

function phyllotaxis(radius) {
  var theta = Math.PI * (3 - Math.sqrt(5));
  return function(i, index) {
    var r = radius * Math.sqrt(i), a = theta * i;
    return {
      id: index,
      cx: 500 / 2 + r * Math.cos(a),
      cy: 300 / 2 + r * Math.sin(a)
    };
  };
}


ReactDOM.render( 
  <Mimic width={width} height={height} zoom={true} view={view(data)} data={data} />, 
  document.getElementById('view'));
