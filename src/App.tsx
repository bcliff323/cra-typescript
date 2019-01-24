import React, { Component, ReactNode } from 'react';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { List } from './components/PoolList';

// Any additional component props go here.
interface OwnProps {
    store: any;
    history: any;
    children?: ReactNode;
}

const Routes: React.SFC = () => (
    <Switch>
        <Route exact path="/" component={() => <div>Home Page</div>} />
        <Route component={() => <div>Not Found</div>} />
    </Switch>
);

const App: React.StatelessComponent<OwnProps> = props => {
    debugger;
    return (
        <Provider store={props.store}>
            <ConnectedRouter history={props.history}>
                <Routes />
            </ConnectedRouter>
        </Provider>
    );
};

export default App;
