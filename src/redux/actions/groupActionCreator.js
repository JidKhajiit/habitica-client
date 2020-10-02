import {
    SET_GROUPS,
    GET_GROUPS_REQ
} from '../types';


export const setGroups = (payload) => {
    return {
        type: SET_GROUPS,
        payload
    }
}

export const getGroupsReq = () => {
    return { type: GET_GROUPS_REQ }
}