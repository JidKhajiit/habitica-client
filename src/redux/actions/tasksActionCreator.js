import {
    CREATE_TASK_OR_GROUP_REQ,
    SAVE_NEW_TASK
} from '../types';


export const createTaskOrGroupReq = (payload) => {
    return {
        type: CREATE_TASK_OR_GROUP_REQ,
        payload
    }
}

export const saveNewTask = (payload) => {
    return {
        type: SAVE_NEW_TASK,
        payload
    }
}