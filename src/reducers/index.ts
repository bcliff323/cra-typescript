import { combineReducers } from 'redux-immutable';
import users from './users';
import route from './route';

export default function createReducer() {
    return combineReducers({
        users: users,
        route: route
    });
}
