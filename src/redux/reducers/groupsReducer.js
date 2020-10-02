import { SET_GROUPS } from "../types";

const initialState = {
    groups: []

}

export default (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case SET_GROUPS:
            return { ...state, groups: payload }

        default: return state
    }
}