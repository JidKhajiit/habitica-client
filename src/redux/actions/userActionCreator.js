import {
    CREATE_USER_REQ,
    AUTH_USER_REQ,
    SET_USER,
    SET_AUTH_LOADING,
    CHECK_AUTH_USER,
    SET_AUTH
} from '../reducers/types';

export const createUser = (newUser) => {
    return {
        type: CREATE_USER_REQ,
        payload: newUser
    }
}

export const setIsAuthLoading = (isLoading) => {
    return {
        type: SET_AUTH_LOADING,
        payload: isLoading
    }
}

export const checkAuthUser = (token) => {
    return {
        type: CHECK_AUTH_USER,
        payload: token
    }
}

export const authUser = (user) => {
    return {
        type: AUTH_USER_REQ,
        payload: user
    }
}

export const setUser = (token) => {
    return {
        type: SET_USER,
        payload: token
    }
}

export const setAuth = (value) => {
    return {
        type: SET_AUTH,
        payload: value
    }
}
