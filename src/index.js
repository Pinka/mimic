import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as d3 from 'd3';
import Mimic from './mimic';
import MimicTree from './mimic/tree';

//mimic data
var data = d3.range(100)
  .map(phyllotaxis(10));

var tree = data
  .map((item, index) => {
    return {
      id: 'm-' + index,
      name: 'circle',
      parentId: 'root',
      data: item
    };
  })
  .concat([{
    id: 'root',
    parentId: null,
    name: 'MIMIC DATA'
  }]);

var view = (
  <svg>
    <g>
      {
        data.map((d, i) => <circle id={d.id} r="2.5" cx={d.cx} cy={d.cy} key={i}></circle>)
      }
    </g>
    <MimicTree data={tree} x={0} y={10} />
  </svg>
);

ReactDOM.render(
  <Mimic
    width="auto"
    height="auto"
    zoom={true}
    drag={true}
    view={view}
    data={data} />,
  document.getElementById('view'));

function phyllotaxis(radius) {
  var theta = Math.PI * (3 - Math.sqrt(5));
  return function (i, index) {
    var r = radius * Math.sqrt(i), a = theta * i;
    return {
      cx: 500 / 2 + r * Math.cos(a) + 200,
      cy: 300 / 2 + r * Math.sin(a)
    };
  };
}
