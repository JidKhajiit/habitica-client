import {
    CREATE_TASK_OR_GROUP_REQ,
    SET_TASKS
} from '../types';


export const createTaskOrGroupReq = (payload) => {
    return {
        type: CREATE_TASK_OR_GROUP_REQ,
        payload
    }
}

export const setTasks = (payload) => {
    return {
        type: SET_TASKS,
        payload
    }
}