import { all, fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import tasksSaga from './tasksSaga';
import groupsSaga from './groupsSaga';
import usersSaga from './usersSaga';

export default function *rootSaga() {
  yield all([
    fork(authSaga),
    fork(tasksSaga),
    fork(groupsSaga),
    fork(usersSaga)
  ]);
}
