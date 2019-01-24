import { call, take, all, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import { SET_USER_POOLS, SET_USERS } from '../constants/ActionTypes';
import queryString from 'query-string';
import { api } from '../api';

export default function* rootSaga() {
    yield all([call(watchRouteChange)]);
}

export function* watchRouteChange() {
    while (true) {
        const locationChange = yield take(LOCATION_CHANGE);
        const location = locationChange.payload.location.pathname;
        switch (location) {
            case '/':
                const pools = yield call(api.getUserPools);
                yield put({
                    type: SET_USER_POOLS,
                    data: {
                        userPools: pools.data
                    }
                });
                break;
            case '/users':
                const qs = queryString.parse(
                    locationChange.payload.location.search
                );
                const users = yield call(api.getUsersInPool, qs.poolId);
                yield put({
                    type: SET_USERS,
                    data: {
                        users: users.data
                    }
                });
                break;
            default:
                break;
        }
    }
}
