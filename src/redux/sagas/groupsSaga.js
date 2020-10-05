import { put, call, takeEvery } from 'redux-saga/effects';
import { GET_GROUP_REQ, GET_GROUPS_REQ } from '../types';
import axios from 'axios';
import { URL } from '../../config/constants';
import { setGroups, setOpenedGroup } from '../actions/groupActionCreator.js';

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

        
        // yield put(switchLoginFormController(false));
    } catch (error) {
        // yield put(renderMessage(error.request.response));
        console.log('her', error.request.response);
    }
}

function* GetGroupRequest({ payload: groupId }) {
    try {

        const response = yield call(axios, {
            method: 'get',
            url: `http://localhost:3001/groups/${groupId}`,
            headers: { authorization: token },
        });
        // console.log("it's me, response!!", response.data)
        yield put(setOpenedGroup(response.data));
    } catch (error) {
        console.log(error.message);
    }
}


export default function* watchAuth() {
    yield takeEvery(GET_GROUPS_REQ, GetGroupsRequest);
    yield takeEvery(GET_GROUP_REQ, GetGroupRequest)
}

