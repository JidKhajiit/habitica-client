import { SET_HEADER_TAB, SET_ALERT, SET_MODAL } from '../types'


const initialState = {

    activeHeaderTab: "/home",
    alert: {
        message: null,
        isRender: false,
    },
    // modal: {
    //     message: null,
    //     isRender: false,
    // },


}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_HEADER_TAB: {
            return { ...state, activeHeaderTab: action.payload }
        }
        case SET_ALERT: {
            return { ...state, alert: action.payload }
        }
        // case SET_MODAL: {
        //     return { ...state, modal: action.payload}
        // }
        default: return state
    }
}