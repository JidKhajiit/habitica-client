import { SET_HEADER_TAB } from '../types'


const initialState = {

    activeHeaderTab: "/home"

}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_HEADER_TAB: {
            return { ...state, activeHeaderTab: action.payload }
        }
        // case SET_AUTH: {
        //     return { ...state, isAuth: action.payload }
        // }
        default: return state
    }
}