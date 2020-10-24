import {
    CREATE_TASK_OR_GROUP_REQ,
    DELETE_ITEM_REQ, 
    EDIT_ITEM_REQ
} from '../types';


export const createItemReq = (payload) => ({
    type: CREATE_TASK_OR_GROUP_REQ,
    payload
});

export const deleteItem = (payload) => ({
    type: DELETE_ITEM_REQ,
    payload
});

export const editItem = (payload) => ({
    type: EDIT_ITEM_REQ,
    payload
})