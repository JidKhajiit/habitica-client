import { put, call, takeEvery } from 'redux-saga/effects';
import { CREATE_TASK_OR_GROUP_REQ, CHECK_TASK_REQ, DELETE_ITEM_REQ, EDIT_ITEM_REQ } from '../types';
import axios from 'axios';
import { URL } from '../../config/constants';
import { setGroups, getGroupReq, getGroupsReq, setEditingGroupId } from '../actions/groupActionCreator.js';
import { setEditingTaskId } from '../actions/tasksActionCreator';

const token = localStorage.getItem('token');

function* CreatingItemRequest({ payload: { data, type } }) {

    try {

        const res = yield call(axios, {
            method: 'post',
            url: `${URL}${type}s/new-${type}`,
            data,
            headers: {
                authorization: token
            }
        });

        if (type === 'task') {
            yield put(getGroupReq(res.data.groupId));
        } else if (type === 'group') {
            yield put(setGroups(res.data)); //????????
        } else {
            throw new Error("Invalide object.");
        }
    } catch (error) {

        console.log('her', error.request.response);
    }
}

function* checkTaskReq({ payload: { _id, completed, groupId } }) {
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
        console.log('her', error.request.response);
    }
}

function* editItemReq({ payload: { id, data, type, groupId } }) {
    try {
        console.log(data)
        yield call(axios, {
            method: 'patch',
            url: `${URL}${type}s/${id}`,
            data,
            headers: {
                authorization: token
            }
        });
        if (type === "task") {
            yield put(getGroupReq(groupId));
            yield put(setEditingTaskId())
        } else {
            yield put(getGroupsReq());
            yield put(setEditingGroupId())
        }
    } catch (error) {
        console.log('her', error.request.response);
    }
}

function* deleteItemReq({ payload }) {
    try {
        yield call(axios, {
            method: 'delete',
            url: `${URL}${payload.type}s/${payload.id}`,
            headers: {
                authorization: token
            }
        });
        if (payload.type === "task") {
            yield put(getGroupReq(payload.groupId));
        } else {
            yield put(getGroupsReq());
        }


    } catch (error) {
        console.log('her', error.request.response);
    }
}


export default function* watchAuth() {
    yield takeEvery(CREATE_TASK_OR_GROUP_REQ, CreatingItemRequest);
    yield takeEvery(CHECK_TASK_REQ, checkTaskReq);
    yield takeEvery(DELETE_ITEM_REQ, deleteItemReq);
    yield takeEvery(EDIT_ITEM_REQ, editItemReq);
}

