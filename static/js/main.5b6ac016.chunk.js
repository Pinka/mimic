(this.webpackJsonpmimic=this.webpackJsonpmimic||[]).push([[0],{1096:function(e,t,n){},1100:function(e,t,n){"use strict";n.r(t);var o=n(1),a=n.n(o),r=n(16),i=n.n(r),c=(n(45),n(2)),l=n.n(c),u=n(17),s=n(12),f=n(11),p=n.n(f),m=n(19),d=n(27),v=n.n(d),h="https://9tvgcnacn7.execute-api.eu-central-1.amazonaws.com/default/mimic",y=function(){g().forEach(function(){var e=Object(m.a)(p.a.mark((function e(t){var n,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("rest"!==t.data.type){e.next=6;break}return e.next=3,fetch(t.data.url).then((function(e){return e.json()}));case 3:n=e.sent,o=N(n,t.data.sourceKey),T(t,t.data.destKey,o);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},b=function(e){var t=e.payload,n=t.item,o=t.itemName,a=t.values,r=function(t){"update"===e.type&&w(t,a)};o&&l.a.project.getItems({name:o}).forEach((function(e){r(e)})),n&&r(n)},g=function(){var e,t;return null!==(e=null===(t=l.a.project)||void 0===t?void 0:t.activeLayer.getItems())&&void 0!==e?e:[]},j=function(e){return l.a.project.getItems({match:function(t){return 0===(t.name||"").indexOf(e)}})},w=function(e,t){if(t.position&&e.position){var n=t.position.x||e.position.x,o=t.position.y||e.position.y,a=new l.a.Point(n,o);e.tweenTo({position:a},300)}if(t.point&&e.point){var r=t.point.x||e.point.x,i=t.point.y||e.point.y,c=new l.a.Point(r,i);e.point=c}t.content&&e.content&&(e.content=t.content);var u=["position","point","content"];return Object.keys(t).filter((function(e){return!u.includes(e)})).forEach((function(n){void 0!==e[n]&&e.tweenTo(Object(s.a)({},n,t[n]),300)})),e},k=function(){var e=new l.a.Path;e.strokeColor="rgba(0,0,0,0.87)",e.strokeWidth=2,e.name="line"+j("line").length;var t=new l.a.Point(100,100);e.moveTo(t),e.lineTo(t.add([200,-50])),l.a.project.activeLayer.selected=!1,e.selected=!0},E=function(){var e=new l.a.Path.Circle(new l.a.Point(100,100),50);e.fillColor="rgba(0,0,0,0.87)",e.strokeColor="rgba(0,0,0,0.87)",e.strokeWidth=2,e.closed=!0,e.name="circle"+j("circle").length,l.a.project.activeLayer.selected=!1,e.selected=!0},O=function(){var e=new l.a.Path.Rectangle(0,0,100,100);e.fillColor="rgba(0,0,0,0.87)",e.strokeColor="rgba(0,0,0,0.87)",e.strokeWidth=2,e.closed=!0,e.name="rect"+j("rect").length,l.a.project.activeLayer.selected=!1,e.selected=!0},C=function(e){var t=e.point||new l.a.Point(100,100),n=e.content||"Text",o=new l.a.PointText(t);return o.justification="center",o.fillColor="black",o.strokeWidth=2,o.content=n,o.name="text"+j("text").length,o.onClick=e.onClick,o},x=function(){var e=Object(m.a)(p.a.mark((function e(){var t,n,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=l.a.project.activeLayer.exportJSON(),localStorage.setItem("project",t),n=v.a.random.words(),o={name:n,config:t},e.prev=4,e.next=7,fetch(h,{method:"PUT",mode:"cors",cache:"no-cache",headers:{"Content-Type":"application/json","x-api-key":"wL5upgCpe33dj3Ozu1Ron2x9PFnzlE4S7DXh8DH6"},body:JSON.stringify(o)});case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(4),console.log("Save mimic error",e.t0);case 12:case"end":return e.stop()}}),e,null,[[4,9]])})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=Object(m.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(t=localStorage.getItem("project"))&&l.a.project.activeLayer.importJSON(t);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(){var e=Object(m.a)(p.a.mark((function e(){var t,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(h,{method:"GET",mode:"cors",cache:"no-cache",headers:{"Content-Type":"application/json","x-api-key":"wL5upgCpe33dj3Ozu1Ron2x9PFnzlE4S7DXh8DH6"}});case 3:return t=e.sent,e.next=6,t.json();case 6:return n=e.sent,console.log("Mimics loaded",n),e.abrupt("return",n);case 11:e.prev=11,e.t0=e.catch(0),console.log("Mimics load error",e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}(),N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".",o=Array.isArray(t)?t:t.split(n);return o.reduce((function(e,t){return e&&e[t]}),e)};function T(e,t,n){if(t)if("string"===typeof t&&(t=t.split(".")),t.length>1){var o=t.shift();null!=e[o]&&"object"===typeof e[o]||(e[o]={}),T(e[o],t,n)}else e[t[0]]=n}var L=[],_=[],W=function(){return L.slice()},A=function(){if(!l.a.tools.find((function(e){return"toolSelect"===e.name}))){var e=new l.a.Tool;e.name="toolSelect",e.minDistance=5;var t,n,o={segments:!0,stroke:!0,fill:!0,tolerance:5};e.onMouseDown=function(e){t=n=null;var a=l.a.project.hitTest(e.point,o);if(a)if(e.modifiers.shift)"segment"===a.type&&a.segment.remove();else{if(n=a.item,"segment"===a.type)t=a.segment;else if("stroke"===a.type){var r=a.location;t=n.insert(r.index+1,e.point),n.smooth()}"fill"===a.type&&l.a.project.activeLayer.addChild(a.item)}},e.onMouseMove=function(e){if(e.item){if("button"===e.item.name)return;l.a.project.activeLayer.selected=!1,e.item.selected=!0}},e.onMouseDrag=function(e){if(t){var o=t.point.add(e.delta);t.point=o}else n&&n.selected&&(n.position=n.position.add(e.delta))},e.onMouseUp=function(e){if(t){var n=e.point.subtract(e.delta),o=e.point;a={key:"segment.point",payload:{segment:t,from:n,to:o}},L.push(a),L.length>1e3&&L.pop(),_.forEach((function(e){return e(W())}))}var a}}},R=Object(o.memo)((function(){var e=Object(o.useRef)(),t=Object(o.useRef)([]);return Object(o.useEffect)((function(){var n=t.current;l.a.setup(e.current),A(),function(){var e=l.a.project.activeLayer,t={color:"rgba(0,0,0,0.11)",width:l.a.view.viewSize.width,height:l.a.view.viewSize.height},n=function(e){var t=new l.a.Path(e);return t.strokeColor="rgba(0,0,0,0.21)",t.strokeWidth=1,t.locked=!0,t};(new l.a.Layer).name="grid-layer",function(e){for(var t=e.color,o=e.width,a=e.height,r=[],i=0;i<o;i++)if(i%10===0){var c=new l.a.Point(i,0),u=new l.a.Point(i,a),s=n([c,u]);s.strokeColor=t,s.strokeWidth=i%50===0?2:1,r.push(s)}}(t),function(e){for(var t=e.color,o=e.width,a=e.height,r=[],i=0;i<a;i++)if(i%10===0){var c=new l.a.Point(0,i),u=new l.a.Point(o,i),s=n([c,u]);s.strokeColor=t,s.strokeWidth=i%50===0?2:1,r.push(s)}}(t),e.activate()}(),S(),y(),l.a.view.onFrame=function(e){if(n.length>0){var t=n[n.length-1];b(t);var o=n.indexOf(t);o>-1&&n.splice(o,1)}},setInterval((function(){y()}),5e3),setInterval((function(){new Array(10).fill(null).map((function(e,t){return{type:"update",payload:{itemName:"rect"+t,values:{fillColor:l.a.Color.random()}}}})).forEach((function(e){n.push(e)}))}),1e3)}),[]),a.a.createElement("canvas",{ref:e,resize:"resize"})})),D=n(24),I=n.n(D),F=n(10),K=n(36),z=(n(1096),n(28)),B=n(29),M=n(37),U=n(30),J=n(38),H=function(e){function t(e){var n;return Object(z.a)(this,t),(n=Object(M.a)(this,Object(U.a)(t).call(this,e))).portalEl=document.createElement("div"),n}return Object(J.a)(t,e),Object(B.a)(t,[{key:"componentDidMount",value:function(){document.body.appendChild(this.portalEl)}},{key:"componentWillUnmount",value:function(){document.body.removeChild(this.portalEl)}},{key:"render",value:function(){return i.a.createPortal(this.props.children,this.portalEl)}}]),t}(a.a.Component),G=n(31),X=n.n(G),$=function(e){var t=Object(o.useRef)(),n=Object(o.useRef)(),r=Object(o.useRef)(),i=Object(o.useState)(!1),c=Object(F.a)(i,2),l=c[0],u=c[1],s=Object(o.useState)([]),f=Object(F.a)(s,2),p=f[0],m=f[1];Object(o.useEffect)((function(){P().then(m)}),[]),Object(o.useEffect)((function(){return r.current=Object(K.a)(t.current,n.current,{placement:"left-start",strategy:"fixed",modifiers:[{name:"offset",options:{offset:function(e){e.placement;var t=e.reference;e.popper;return[0,-t.width]}}}]}),function(){r.current.destroy()}}),[]);var d=function(){u((function(e){return!e}),r.current.forceUpdate())};return a.a.createElement(a.a.Fragment,null,a.a.createElement("button",{ref:t,onClick:d},"Load Mimic"),a.a.createElement(H,null,a.a.createElement("div",{className:"popup__container",ref:n},l&&a.a.createElement(X.a,{focusTrapOptions:{onDeactivate:d,clickOutsideDeactivates:!0}},a.a.createElement("div",{className:"popup"},(p||[]).map((function(t,n){return a.a.createElement("div",{key:n,tabIndex:0,onClick:function(){return e.onSelect(t)}},t.name)})))))))},q=Object(o.memo)((function(){var e=[{title:"Add Line",onClick:k},{title:"Add Circle",onClick:E},{title:"Add Rect",onClick:O},{title:"Add Text",onClick:C},{title:"Save",onClick:x},{title:"Load",onClick:S}],t=Object(o.useCallback)((function(e){l.a.project.activeLayer.importJSON(e.config)}),[]);return a.a.createElement("div",{className:I.a.tools},e.map((function(e,t){return a.a.createElement("button",{key:t,className:I.a.toolButton,onClick:e.onClick},e.title)})),a.a.createElement($,{onSelect:t}))})),Q=n(35),V=n.n(Q),Y=Object(o.memo)((function(){var e,t=Object(o.useState)(W()),n=Object(F.a)(t,2),r=n[0],i=void 0===r?[]:r,c=n[1];return e=function(e){c(e)},_.push(e),a.a.createElement("ul",{className:V.a.history},i.map((function(e,t){var n,o,r,i;return a.a.createElement("li",{key:t},"".concat(e.key,": x/y = ").concat(null===(n=e.payload)||void 0===n?void 0:n.from.x,"/").concat(null===(o=e.payload)||void 0===o?void 0:o.from.y," -> ").concat(null===(r=e.payload)||void 0===r?void 0:r.to.x,"/").concat(null===(i=e.payload)||void 0===i?void 0:i.to.y))})))})),Z=n(22),ee=n.n(Z),te=Object(o.memo)((function(){var e=Object(o.useState)(!1),t=Object(F.a)(e,2),n=t[0],r=t[1],i=Object(o.useState)({}),c=Object(F.a)(i,2),f=c[0],p=c[1],m=Object(o.useState)([]),d=Object(F.a)(m,2),v=d[0],h=d[1],y=function(e){var t=Object(u.a)({},f,Object(s.a)({},e.target.name,e.target.value));p(t)};return n?a.a.createElement("div",{className:ee.a.bind},a.a.createElement("label",{htmlFor:"item"},"Item Name"),a.a.createElement("select",{name:"item",onChange:y},v.map((function(e,t){return a.a.createElement("option",{key:t,value:e.name},e.name)}))),a.a.createElement("label",{htmlFor:"url"},"Url with JSON response"),a.a.createElement("input",{type:"text",name:"url",onChange:y}),a.a.createElement("label",{htmlFor:"sourceKey"},"Source Key"),a.a.createElement("input",{type:"text",name:"sourceKey",onChange:y}),a.a.createElement("label",{htmlFor:"destKey"},"Destination Key"),a.a.createElement("input",{type:"text",name:"destKey",onChange:y}),a.a.createElement("div",{className:ee.a.actions},a.a.createElement("button",{type:"button",onClick:function(){!function(e){var t=e.itemName,n=e.item,o=e.binding,a={type:"rest",url:"https://jsonplaceholder.typicode.com/todos/1",sourceKey:"title",destKey:"content"},r=function(e){e.data=Object(u.a)({},e.data,{},a,{},o)};t&&l.a.project.getItems({name:t}).forEach((function(e){r(e)})),n&&r(n)}({item:v.filter((function(e){return e.name===f.item}))[0],itemName:f.itemName,binding:Object(u.a)({type:"rest"},f)}),r(!1)}},"Bind"),a.a.createElement("button",{type:"button",onClick:function(){r(!1)}},"Cancel"))):a.a.createElement("div",{className:ee.a.bind},a.a.createElement("button",{type:"button",onClick:function(){h(g().sort((function(e,t){return e.name>t.name?1:-1}))),r(!0)}},"Bind"))}));var ne=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(R,null),a.a.createElement(q,null),a.a.createElement(Y,null),a.a.createElement(te,null))},oe=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ae(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(a.a.createElement(ne,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/mimic",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/mimic","/service-worker.js");oe?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var o=n.headers.get("content-type");404===n.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):ae(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):ae(t,e)}))}}()},22:function(e,t,n){e.exports={bind:"Bind_bind__3PT2w",actions:"Bind_actions__3CvtG"}},24:function(e,t,n){e.exports={tools:"PaperTools_tools__1gGrH",toolButton:"PaperTools_toolButton__3H_SE"}},35:function(e,t,n){e.exports={history:"History_history__3cTjF"}},40:function(e,t,n){e.exports=n(1100)},45:function(e,t,n){},46:function(e,t){},48:function(e,t){}},[[40,1,2]]]);
//# sourceMappingURL=main.5b6ac016.chunk.js.map