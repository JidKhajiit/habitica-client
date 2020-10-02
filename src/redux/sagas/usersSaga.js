import { put, call, takeEvery } from 'redux-saga/effects';
import { GET_USERS_REQ } from '../types';
import axios from 'axios';
import { URL } from '../../config/constants';
import { setUsers } from '../actions/usersActionCreator.js';

const token = localStorage.getItem('token');

function* GetUsersRequest() {

    try {

        const res = yield call(axios, {
            method: 'get',
            url: `${URL}users/nicks`,
            headers: {
                authorization: token
            }
        });

        yield put(setUsers(res.data));

        console.log('ответ пришёл', res.data);
        // yield put(switchLoginFormController(false));
    } catch (error) {
        // yield put(renderMessage(error.request.response));
        console.log('her', error.request.response);
    }
}


export default function* watchAuth() {
    yield takeEvery(GET_USERS_REQ, GetUsersRequest);

}

