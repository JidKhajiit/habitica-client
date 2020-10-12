import { SET_ALERT } from '../types'


const initialState = {

    // activeHeaderTab: "/home",
    alert: {
        message: null,
        isVisible: false,
    },



}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_ALERT: {
            return { ...state, alert: action.payload }
        }
        // case SET_MODAL: {
        //     return { ...state, modal: action.payload}
        // }
        default: return state
    }
}