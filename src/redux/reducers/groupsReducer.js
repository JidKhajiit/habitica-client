import { SET_GROUPS, SET_OPENED_GROUP } from "../types";

const initialState = {
    groups: [],
    openedGroup: null

}

export default (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case SET_GROUPS:

            return { ...state, groups: payload }
        case SET_OPENED_GROUP:

            return { ...state, openedGroup: payload }
        default: return state
    }
}