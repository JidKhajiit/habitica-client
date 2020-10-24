import {
    SET_TASKS,
    CHECK_TASK_REQ,
    SET_EDITING_TASK_ID
} from '../types';


export const setTasks = (payload) => ({
    type: SET_TASKS,
    payload
});

export const checkTask = (payload) => ({
    type: CHECK_TASK_REQ,
    payload
});

export const setEditingTaskId = (payload) => ({
    type: SET_EDITING_TASK_ID,
    payload: payload || null
})