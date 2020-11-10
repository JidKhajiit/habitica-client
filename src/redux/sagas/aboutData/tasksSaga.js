import { put, call, takeEvery } from 'redux-saga/effects';
import { CHECK_TASK_REQ } from '../../types';
import axios from 'axios';
import { URL } from '../../../config/constants';
import { getGroupReq } from '../../actions/groupActionCreator.js';
import { showAlert } from '../../actions/appActionCreator';

const token = localStorage.getItem('token');

function* changeCheckStatusOfTaskWithIdReq({ payload: { _id, completed, groupId } }) {
    try {
        yield call(axios, {
            method: 'patch',
            url: `${URL}tasks/check/${_id}`,
            data: { completed: !completed },
            headers: {
                authorization: token
            }
        });
        yield put(getGroupReq(groupId));

    } catch (error) {
        yield put(showAlert(error.request.response));
        console.log('error', error.request.response);
    }
}


export default function* watchAuth() {
    yield takeEvery(CHECK_TASK_REQ, changeCheckStatusOfTaskWithIdReq);

}

