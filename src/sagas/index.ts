import route from './route';
import { fork } from 'redux-saga/effects';

export default function* rootSaga() {
    yield fork(route);
}
