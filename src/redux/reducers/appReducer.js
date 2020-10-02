import { SET_HEADER_TAB } from '../types'


const initialState = {

    activeHeaderTab: "/home",
    // blockActiveHeaderTab: true

}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_HEADER_TAB: {
            return { ...state, activeHeaderTab: action.payload }
        }
        // case BLOCK_ACTIVE_TAB: {
        //     return { ...state, blockActiveHeaderTab: action.payload }
        // }
        default: return state
    }
}