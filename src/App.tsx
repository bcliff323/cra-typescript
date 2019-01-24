import React, { Component, ReactNode } from 'react';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Route, Switch } from 'react-router';
import logo from './logo.svg';
import './App.css';
import { List } from './components/PoolList';
import Home from './containers/Home';
import Users from './containers/Users';

// Any additional component props go here.
interface OwnProps {
    history: any;
    children?: ReactNode;
}

const router = (history: any) => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route component={Users} />
        </Switch>
    </ConnectedRouter>
);

export const App = ({ history }: OwnProps) => router(history);
