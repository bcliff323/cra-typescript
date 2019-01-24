import React, { Component, ReactNode } from 'react';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { List } from './components/PoolList';

// Any additional component props go here.
interface OwnProps {
    history: any;
    children?: ReactNode;
}

const router = (history: any) => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path="/" component={() => <div>Home Page</div>} />
            <Route component={() => <div>Not Found</div>} />
        </Switch>
    </ConnectedRouter>
);

export const App = ({ history }: OwnProps) => router(history);
