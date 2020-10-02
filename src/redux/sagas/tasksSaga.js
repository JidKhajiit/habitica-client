import { put, call, takeEvery } from 'redux-saga/effects';
import { CREATE_TASK_OR_GROUP_REQ } from '../types';
import axios from 'axios';
import { URL } from '../../config/constants';
import { saveNewTask } from '../actions/tasksActionCreator.js';
import { setGroups } from '../actions/groupActionCreator.js';
import { useSelector } from 'react-redux';

const token = localStorage.getItem('token');

function* CreatingItemRequest({ payload: { data, object } }) {
    
    try {

        const res = yield call(axios, {
            method: 'post',
            url: `${URL}${object}s/new-${object}`,
            data,
            headers: {
                authorization: token
            }
        });

        if (object === 'task') {
            yield put(saveNewTask(res.data));
        } else if (object === 'group') {
            yield put(setGroups(res.data));
        } else {
            throw new Error("Invalide object.");
        }


        console.log('ответ пришёл', res.data);
        // yield put(switchLoginFormController(false));
    } catch (error) {
        // yield put(renderMessage(error.request.response));
        console.log('her', error.request.response);
    }
}


export default function* watchAuth() {
    yield takeEvery(CREATE_TASK_OR_GROUP_REQ, CreatingItemRequest);

}

