import { put, call, takeEvery } from 'redux-saga/effects';
import { setUser, setAuth, setIsAuthLoading } from '../actions/myUserActionCreator';
import  { CREATE_USER_REQ, AUTH_USER_REQ, CHECK_AUTH_USER  } from '../types';
import axios from 'axios';
import { URL } from '../../config/constants';


function *AuthorizationRequest(action) {
  try {
    const res = yield call(axios, {
      method: 'post',
      url: `${URL}auth/signin/`,
      data: action.payload,
    });

    yield put(setUser(res.data));
    yield put(setAuth(true));
    console.log('ответ пришёл', res.data);
    // yield put(switchLoginFormController(false));
  } catch (error) {
    // yield put(renderMessage(error.request.response));
    console.log('her', error.request.response);
  }
}

function *RegistrationRequest(action) {
  try {
    const res = yield call(axios, {
      method: 'post',
      url: `${URL}auth/signup/`,
      data: action.payload,
    });

    // if (res.msg) {
        
    // //   yield put(renderMessage(res.msg));
    // }

    yield put(setUser(res.data));
    yield put(setAuth(true));
    // yield put(switchLoginFormController(false)); //
  } catch (error) {
    // yield put(renderMessage(error.request.response));
    console.log('error', error.request.response);
  }
}

function *CheckAuthUserRequest(action) {
  try {
    const res = yield call(axios, {
      method: 'get',
      url: `${URL}auth/verify`,
      headers: { authorization: action.payload },
    });
    console.log('res', res);
    yield put(setAuth(true));
    yield put(setIsAuthLoading(false));
  } catch(error) {
    // yield delay(4000);
    yield put(setAuth(false));
    yield put(setIsAuthLoading(false));   
  }
}


export default function *watchAuth() {
  yield takeEvery(AUTH_USER_REQ, AuthorizationRequest);
  yield takeEvery(CREATE_USER_REQ, RegistrationRequest);
  yield takeEvery(CHECK_AUTH_USER, CheckAuthUserRequest);
}

