import { put, call, takeEvery } from 'redux-saga/effects';
import { GET_USERS_REQ } from '../../types';
import axios from 'axios';
import { URL } from '../../../config/constants';
import { setUsers } from '../../actions/usersActionCreator.js';

function* GetUsersRequest() {
    const token = localStorage.getItem('token');
    try {

        const res = yield call(axios, {
            method: 'get',
            url: `${URL}users/nicks`,
            headers: {
                authorization: token
            }
        });

        yield put(setUsers(res.data));
    } catch (error) {
        console.log('error', error.request.response);
    }
}


export default function* watchAuth() {
    yield takeEvery(GET_USERS_REQ, GetUsersRequest);

}

