import {
    SET_USERS,
    GET_USERS_REQ,
    SET_MY_FRIENDS
} from '../types';


export const setUsers = payload => ({
    type: SET_USERS,
    payload
})

export const getUsersReq = () => ({ type: GET_USERS_REQ })

export const setMyFriends = (payload) => ({
    type: SET_MY_FRIENDS,
    payload
})
