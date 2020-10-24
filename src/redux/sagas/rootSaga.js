import { all, fork } from 'redux-saga/effects';
import authSaga from './aboutData/authSaga';
import tasksSaga from './aboutData/tasksSaga';
import groupsSaga from './aboutComponent/groupsSaga';
import usersSaga from './aboutData/usersSaga';
import appSaga from './aboutComponent/appSaga';
import groupsAndTasks from './aboutData/groupsOrTasks';

export default function *rootSaga() {
  yield all([
    fork(authSaga),
    fork(appSaga),
    fork(usersSaga),
    fork(tasksSaga),
    fork(groupsSaga),
    fork(groupsAndTasks)

  ]);
}
