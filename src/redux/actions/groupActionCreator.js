import {
    SET_GROUPS,
    GET_GROUPS_REQ,
    GET_GROUP_REQ,
    SET_OPENED_GROUP,
    SET_EDITING_GROUP_ID,
    GET_GROUP_USERS_REQ,
    SET_EDITING_GROUP_USERS,
    GET_DATA_FOR_GROUPS,
    SET_HOVERED_GROUP,
    SET_SEARCH_TEXT_FOR_GROUPS,
    SET_FILTER_USERS_FOR_GROUPS,
    SET_FILTER_TAGS_FOR_GROUPS
} from '../types';


export const setFilterTagsForGroups = payload => ({
    type: SET_FILTER_TAGS_FOR_GROUPS,
    payload
})

export const setFilterUsersForGroups = payload => ({
    type: SET_FILTER_USERS_FOR_GROUPS,
    payload
})

export const setSearchTextForGroups = payload => ({
    type: SET_SEARCH_TEXT_FOR_GROUPS,
    payload
})

export const setHoveredGroup = payload => ({
    type: SET_HOVERED_GROUP,
    payload
})

export const getDataForGroups = (payload) => ({
    type: GET_DATA_FOR_GROUPS,
    payload
})


export const setEditingGroupUsers = (payload = []) => ({
    type: SET_EDITING_GROUP_USERS,
    payload
})

export const getEditingGroupUsers = (payload) => ({
    type: GET_GROUP_USERS_REQ,
    payload
})

export const setGroups = (payload) => ({
    type: SET_GROUPS,
    payload
})

export const setOpenedGroup = (payload) => ({
    type: SET_OPENED_GROUP,
    payload
})

export const getGroupsReq = () => ({ type: GET_GROUPS_REQ })

export const getGroupReq = (payload) => ({
    type: GET_GROUP_REQ,
    payload
})

export const setEditingGroupId = (payload) => ({
    type: SET_EDITING_GROUP_ID,
    payload: payload || null
})
