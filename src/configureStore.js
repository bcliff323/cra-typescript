/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
// import { fromJS } from "immutable";
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import rootSaga from './sagas';

export default function configureStore(history) {
    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, routerMiddleware(history)];
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        createReducer(),
        /* preloadedState, */ composeEnhancers(applyMiddleware(...middlewares))
    );
    sagaMiddleware.run(rootSaga);
    return store;
}
