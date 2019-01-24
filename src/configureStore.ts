/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
// import { fromJS } from "immutable";
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import rootSaga from './sagas';
import { routerMiddleware } from 'connected-react-router/immutable';

export const history = createBrowserHistory();

export default function configureStore() {
    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, routerMiddleware(history)];
    const composeEnhancer: typeof compose =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        createReducer(history),
        composeEnhancer(applyMiddleware(...middlewares))
    );
    sagaMiddleware.run(rootSaga);
    return store;
}
