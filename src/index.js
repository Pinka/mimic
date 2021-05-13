import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.register();

// serviceWorker.register({
//     onUpdate: () => alert("New content is available and will be used when all tabs for this page are closed."),
//     onSuccess: () => () => {
//         alert("Content is cached for offline use.");

//     }
// });

// setInterval(() => {

//     navigator.serviceWorker.getRegistration()
//         .then(registration => {
//             registration.update();

//         });

// }, 3000);
