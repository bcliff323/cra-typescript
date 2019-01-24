import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router/immutable';
import { History } from 'history';
import users from './users';
import route from './route';

export default function createReducer(history: History) {
    return combineReducers({
        router: connectRouter(history),
        users: users,
        route: route
    });
}
