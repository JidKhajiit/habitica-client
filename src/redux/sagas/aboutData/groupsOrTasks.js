import { put, call, takeEvery } from 'redux-saga/effects';
import { CREATE_TASK_OR_GROUP_REQ, DELETE_ITEM_REQ, EDIT_ITEM_REQ } from '../../types';
import axios from 'axios';
import { URL } from '../../../config/constants';
import { setGroups, getGroupReq, getGroupsReq, setEditingGroupId } from '../../actions/groupActionCreator.js';
import { setEditingTaskId } from '../../actions/tasksActionCreator';
import { showAlert } from '../../actions/appActionCreator';

const token = localStorage.getItem('token');

function* CreateItemRequest({ payload: { data, type } }) {
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
            yield put(getGroupsReq()); //????????
        } else {
            throw new Error("Invalide object.");
        }
    } catch (error) {
        yield put(showAlert(error.request.response));
        console.log('error', error.request.response);
    }
}

function* editItemReq({ payload: { id, data, type, groupId } }) {
    try {
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
        yield put(showAlert(error.request.response));
        console.log('error', error.request.response);
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
        yield put(showAlert(error.request.response));
        console.log('error', error.request.response);
    }
}


export default function* watchAuth() {
    yield takeEvery(CREATE_TASK_OR_GROUP_REQ, CreateItemRequest);
    yield takeEvery(DELETE_ITEM_REQ, deleteItemReq);
    yield takeEvery(EDIT_ITEM_REQ, editItemReq);
}

