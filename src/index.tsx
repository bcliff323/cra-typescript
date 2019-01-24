import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'react-app-polyfill/ie11';
import createHistory from 'history/createBrowserHistory';
import configureStore from './configureStore';

const history = createHistory();
const store = configureStore(history);
console.log(store.getState().toJS());

ReactDOM.render(
    <App store={store} history={history} />,
    document.getElementById('root')
);

registerServiceWorker();
