import { SET_USER, SET_AUTH_LOADING, SET_AUTH, RESET_AUTH } from '../types'
import jwt_decode from "jwt-decode";

let user, personalInfo;

if (localStorage.getItem('token')) {
    user = jwt_decode(localStorage.getItem('token'));
    const { _id, nickName } = user;
    personalInfo = {
        _id,
        nickName
    }
} else {
    personalInfo = {
        _id: null,
        nickName: "Anonimous"
    };
}


const initialState = {
    personalInfo,
    token: localStorage.getItem('token'),
    isAuth: false,
    authLoading: false

}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            const user = jwt_decode(action.payload);
            localStorage.setItem('token', action.payload);
            const { _id, nickName } = user;
            const personalInfo = {
                _id,
                nickName
            }
            return { ...state, personalInfo, token: action.payload }
        case SET_AUTH_LOADING: {

            return { ...state, authLoading: action.payload }
        }
        case SET_AUTH: {
            return { ...state, isAuth: action.payload }
        }
        case RESET_AUTH: {
            localStorage.removeItem('token');
            return { ...state, isAuth: false, authLoading: false, token: null, personalInfo: {} }
        }
        default: return state
    }
}