import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';
import 'react-app-polyfill/ie11';
import createHistory from 'history/createBrowserHistory';
import configureStore from './configureStore';
import { Provider } from 'react-redux';

const history = createHistory();
const store = configureStore(history);

const app = (
    <Provider store={store}>
        <App history={history} />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
