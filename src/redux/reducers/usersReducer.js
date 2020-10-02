import { SET_USERS } from "../types";

const initialState = {
    users: []

}

export default (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case SET_USERS:
            return { ...state, users: payload }

        default: return state
    }
}