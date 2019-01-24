import { call, take, all } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

export default function* rootSaga() {
    yield all([call(watchRouteChange)]);
}

export function* watchRouteChange() {
    while (true) {
        const locationChange = yield take(LOCATION_CHANGE);
        const location = locationChange.payload.pathname;
        switch (location) {
            case '/':
                console.log(location);
                break;
            default:
                break;
        }
    }
}
