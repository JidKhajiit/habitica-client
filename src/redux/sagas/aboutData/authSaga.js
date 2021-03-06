import { put, call, takeEvery } from 'redux-saga/effects';
import { setUser, setAuth, setIsAuthLoading } from '../../actions/myUserActionCreator';
import  { CREATE_USER_REQ, AUTH_USER_REQ, CHECK_AUTH_USER  } from '../../types';
import axios from 'axios';
import { URL } from '../../../config/constants';
import { showAlert } from '../../actions/appActionCreator';


function *AuthorizationRequest(action) {
  try {
    const res = yield call(axios, {
      method: 'post',
      url: `${URL}auth/signin/`,
      data: action.payload,
    });

    yield put(setUser(res.data));
    yield put(setAuth(true));
  } catch (error) {
    yield put(showAlert(error.request.response));
    console.log('error', error.request.response);
  }
}

function *RegistrationRequest(action) {
  try {
    const res = yield call(axios, {
      method: 'post',
      url: `${URL}auth/signup/`,
      data: action.payload,
    });

    yield put(setUser(res.data));
    yield put(setAuth(true));
  } catch (error) {
    yield put(showAlert(error.request.response));
    console.log('error', error.request.response);
  }
}

function *CheckUserAuthRequest(action) {
  try {
    yield call(axios, {
      method: 'get',
      url: `${URL}auth/verify`,
      headers: { authorization: action.payload },
    });
    
    yield put(setAuth(true));
    yield put(setIsAuthLoading(false));
  } catch(error) {
    yield put(showAlert(error.request.response));
    // yield delay(4000);
    yield put(setAuth(false));
    yield put(setIsAuthLoading(false));   
  }
}


export default function *watchAuth() {
  yield takeEvery(AUTH_USER_REQ, AuthorizationRequest);
  yield takeEvery(CREATE_USER_REQ, RegistrationRequest);
  yield takeEvery(CHECK_AUTH_USER, CheckUserAuthRequest);
}
