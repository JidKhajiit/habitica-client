import { SAVE_NEW_TASK } from "../types";

const initialState = {
    tasks: [],

}

export default (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case SAVE_NEW_TASK:

            return { ...state, tasks: [ ...state.tasks, payload ] }

        default: return state
    }
}