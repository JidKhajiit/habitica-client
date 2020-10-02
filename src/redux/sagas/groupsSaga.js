import { put, call, takeEvery } from 'redux-saga/effects';
import { CREATE_TASK_OR_GROUP_REQ, GET_GROUPS_REQ } from '../types';
import axios from 'axios';
import { URL } from '../../config/constants';
import { setGroups } from '../actions/groupActionCreator.js';

const token = localStorage.getItem('token');

function* GetGroupsRequest() {

    try {

        const res = yield call(axios, {
            method: 'get',
            url: `${URL}groups/`,
            headers: {
                authorization: token
            }
        });

        yield put(setGroups(res.data));

        console.log('ответ пришёл', res.data);
        // yield put(switchLoginFormController(false));
    } catch (error) {
        // yield put(renderMessage(error.request.response));
        console.log('her', error.request.response);
    }
}


export default function* watchAuth() {
    yield takeEvery(GET_GROUPS_REQ, GetGroupsRequest);

}

