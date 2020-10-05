import { SET_TASKS } from "../types";

const initialState = {
    tasks: [],

}

export default (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case SET_TASKS:

            return { ...state, tasks: payload }

        default: return state
    }
}