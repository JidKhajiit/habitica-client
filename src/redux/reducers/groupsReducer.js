import { 
    SET_GROUPS,
    SET_OPENED_GROUP,
    SET_EDITING_GROUP_ID,
    SET_EDITING_GROUP_USERS
} from "../types";

const initialState = {
    groups: [],
    openedGroup: null,
    editingGroupId: null,
    editingGroupUsers: []

}

export default (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case SET_GROUPS:

            return { ...state, groups: payload }
        case SET_OPENED_GROUP:

            return { ...state, openedGroup: payload }
        case SET_EDITING_GROUP_ID:

            return { ...state, editingGroupId: payload }
        case SET_EDITING_GROUP_USERS:

            return { ...state, editingGroupUsers: payload }
        default: return state
    }
}