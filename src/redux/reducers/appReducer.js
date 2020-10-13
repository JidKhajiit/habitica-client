import { SET_ALERT, SET_FRIEND_TAB } from '../types'


const initialState = {

    // activeHeaderTab: "/home",
    alert: {
        message: null,
        isVisible: false,
    },
    friendTab: 'my-friends'


}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_ALERT: {
            return { ...state, alert: action.payload }
        }
        case SET_FRIEND_TAB: {
            return { ...state, friendTab: action.payload}
        }
        default: return state
    }
}