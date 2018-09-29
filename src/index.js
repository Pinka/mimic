import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

window.onNewContentAvailable = () => {
    alert("New content available. Reload!");
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
