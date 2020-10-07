import {
    CREATE_TASK_OR_GROUP_REQ,
    SET_TASKS,
    CHECK_TASK_REQ,
    DELETE_ITEM_REQ, SET_EDITING_TASK_ID, EDIT_ITEM_REQ
} from '../types';


export const createTaskOrGroupReq = (payload) => ({
    type: CREATE_TASK_OR_GROUP_REQ,
    payload
});

export const deleteItem = (payload) => ({
    type: DELETE_ITEM_REQ,
    payload
});

export const setTasks = (payload) => ({
    type: SET_TASKS,
    payload
});

export const checkTask = (payload) => ({
    type: CHECK_TASK_REQ,
    payload
});

export const editItem = (payload) => ({
    type: EDIT_ITEM_REQ,
    payload
})

export const setEditingTaskId = (payload) => ({
    type: SET_EDITING_TASK_ID,
    payload: payload || null
})