import {
    SET_USERS,
    GET_USERS_REQ
} from '../types';


export const setUsers = (payload) => {
    return {
        type: SET_USERS,
        payload
    }
}

export const getUsersReq = () => {
    return { type: GET_USERS_REQ }
}