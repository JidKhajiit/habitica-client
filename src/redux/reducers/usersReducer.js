import { SET_USERS, SET_MY_FRIENDS, SET_MEMBERS } from "../types";

const initialState = {
    users: [],
    myFriends: [],
    members: []

}

export default (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case SET_USERS:
            return { ...state, users: payload }
        case SET_MY_FRIENDS:
            return { ...state, myFriends: payload }
        case SET_MEMBERS:
            return { ...state, members: payload }
        default: return state
    }
}