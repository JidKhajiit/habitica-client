import { put, takeEvery, delay } from 'redux-saga/effects';
import { SHOW_ALERT } from '../types';
import { setAlert } from '../actions/appActionCreator';


function* ShowAlert({payload}) {
    try {
        yield put(setAlert(true, payload));
        yield delay(4000);
        yield put(setAlert());
        
        // yield put(switchLoginFormController(false));
    } catch (error) {
        // yield put(renderMessage(error.request.response));
        console.log('her', error.message);
    }
}


export default function* watchAuth() {
    yield takeEvery(SHOW_ALERT, ShowAlert);

}

