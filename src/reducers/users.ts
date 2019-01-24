import { fromJS } from 'immutable';
import { SET_USER_POOLS, SET_USERS } from '../constants/ActionTypes';

const initialState = fromJS({
    userPools: [],
    users: []
});

const users = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER_POOLS:
            return state.set('userPools', action.data.userPools);
        case SET_USERS:
            return state.set('users', action.data.users);
        default:
            return state;
    }
};

export default users;
