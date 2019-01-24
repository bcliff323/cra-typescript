import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';
import 'react-app-polyfill/ie11';
import configureStore, { history } from './configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

const app = (
    <Provider store={store}>
        <App history={history} />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
