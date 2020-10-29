import {
    SET_GROUPS,
    SET_OPENED_GROUP,
    SET_EDITING_GROUP_ID,
    SET_EDITING_GROUP_USERS,
    SET_HOVERED_GROUP,
    SET_SEARCH_TEXT_FOR_GROUPS,
    SET_FILTER_USERS_FOR_GROUPS,
    SET_FILTER_TAGS_FOR_GROUPS
} from "../types";

const initialState = {
    groups: [],
    openedGroup: null,
    editingGroupId: null,
    editingGroupUsers: [],
    hoveredGroupId: null,
    searchText: '',
    filterUsers: [],
    filterTags: []

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
        case SET_HOVERED_GROUP:
            return { ...state, hoveredGroupId: payload }
        case SET_SEARCH_TEXT_FOR_GROUPS:
            return { ...state, searchText: payload }
        case SET_FILTER_USERS_FOR_GROUPS:
            return { ...state, filterUsers: payload }
        case SET_FILTER_TAGS_FOR_GROUPS:
            return { ...state, filterTags: payload }
        default: return state
    }
}