import {
    SET_HEADER_TAB,
    BLOCK_ACTIVE_TAB
} from '../types';


export const setHeaderTab = (activeTab) => {
    return {
        type: SET_HEADER_TAB,
        payload: activeTab
    }
}

// export const blockActiveHeaderTab = (isBlocked) => {
//     return {
//         type: BLOCK_ACTIVE_TAB,
//         payload: isBlocked
//     }
// }