import { all, fork } from 'redux-saga/effects';
import usersSaga from './userSaga';


export default function *rootSaga() {
  yield all([
    fork(usersSaga),
    // fork(tasksSaga),
  ]);
}
