import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if(document.getElementById('redact-table')) {
    ReactDOM.render(<App />, document.getElementById('redact-table'));
}

registerServiceWorker();
