import { SET_TASKS, SET_EDITING_TASK_ID } from "../types";

const initialState = {
    tasks: [],
    editingTaskId: null

}

export default (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case SET_TASKS:

            return { ...state, tasks: payload }
        case SET_EDITING_TASK_ID:

            return { ...state, editingTaskId: payload }
        default: return state
    }
}