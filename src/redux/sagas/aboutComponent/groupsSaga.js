import { put, call, takeEvery } from 'redux-saga/effects';
import { GET_GROUP_REQ, GET_GROUPS_REQ, GET_GROUP_USERS_REQ, GET_DATA_FOR_GROUPS } from '../../types';
import axios from 'axios';
import { URL } from '../../../config/constants';
import { setGroups, setOpenedGroup, setEditingGroupUsers } from '../../actions/groupActionCreator.js';
import { showAlert } from '../../actions/appActionCreator';
import { setMyFriends, setUsers } from '../../actions/usersActionCreator';

function* GetDataForGroupsRequest() {
    const token = localStorage.getItem('token');
    try {
        const groupsResponse = yield call(axios, {
            method: 'get',
            url: `${URL}groups/`,
            headers: {
                authorization: token
            }
        });
        const usersResponse = yield call(axios, {
            method: 'get',
            url: `${URL}users/nicks`,
            headers: {
                authorization: token
            }
        });
        const myFriendsResponse = yield call(axios, {
            method: 'get',
            url: `${URL}users/my-friends/nicks`,
            headers: {
                authorization: token
            }
        });

        yield put(setUsers(usersResponse.data));
        yield put(setGroups(groupsResponse.data));
        yield put(setMyFriends(myFriendsResponse.data));
        
    } catch (error) {
        console.log('error', error.request.response);
    }
}

function* GetMyGroupsRequest() {
    const token = localStorage.getItem('token');
    try {

        const res = yield call(axios, {
            method: 'get',
            url: `${URL}groups/`,
            headers: {
                authorization: token
            }
        });

        yield put(setGroups(res.data));

    } catch (error) {
        yield put(showAlert(error.request.response));
        console.log('error', error.request.response);
    }
}

function* GetGroupWithIdRequest({ payload: groupId }) {
    const token = localStorage.getItem('token');
    try {

        const response = yield call(axios, {
            method: 'get',
            url: `${URL}groups/${groupId}`,
            headers: { authorization: token },
        });

        yield put(setOpenedGroup(response.data));
    } catch (error) {
        yield put(showAlert(error.request.response));
        console.log(error.message);
    }
}

function* GetUsersInGroupWithIdRequest({ payload: groupId }) {
    const token = localStorage.getItem('token');
    try {

        const response = yield call(axios, {
            method: 'get',
            url: `${URL}groups/${groupId}/editing/users`,
            headers: { authorization: token },
        });

        yield put(setEditingGroupUsers(response.data));
    } catch (error) {
        yield put(showAlert(error.request.response));
        console.log(error.message);
    }
}

export default function* watchAuth() {
    yield takeEvery(GET_GROUPS_REQ, GetMyGroupsRequest);
    yield takeEvery(GET_GROUP_REQ, GetGroupWithIdRequest);
    yield takeEvery(GET_GROUP_USERS_REQ, GetUsersInGroupWithIdRequest);
    yield takeEvery(GET_DATA_FOR_GROUPS, GetDataForGroupsRequest);
}

