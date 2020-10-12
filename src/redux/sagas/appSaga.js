import { put, call, takeEvery, delay } from 'redux-saga/effects';
import { SHOW_ALERT } from '../types';
import axios from 'axios';
import { URL } from '../../config/constants';
import { setUsers } from '../actions/usersActionCreator.js';
import { setAlert } from '../actions/appActionCreator';

const token = localStorage.getItem('token');

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

