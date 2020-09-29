import { SET_USER, SET_AUTH_LOADING, SET_AUTH, RESET_AUTH } from '../types'
import jwt_decode from "jwt-decode";

const initialState = {
    personalInfo: {
        login: "",
        firstName: "",
        lastName: "Anonimous"
    },
    token: localStorage.getItem('token'),
    isAuth: false,
    authLoading: false

}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            const user = jwt_decode(action.payload);
            localStorage.setItem('token', action.payload);
            const { login, firstName, lastName } = user;
            const personalInfo = {
                login,
                firstName,
                lastName
            }
            return { ...state, personalInfo, token: action.payload }
        case SET_AUTH_LOADING: {
            console.log("slava что ты сделал")
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