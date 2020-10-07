import {
    SET_HEADER_TAB,
    BLOCK_ACTIVE_TAB,
    SHOW_ALERT,
    SET_ALERT,
    SHOW_MODAL,
    SET_MODAL
} from '../types';


export const setHeaderTab = (activeTab) => {
    return {
        type: SET_HEADER_TAB,
        payload: activeTab
    }
}

export const showAlert = (message) => {
    return {
        type: SHOW_ALERT,
        payload: message
    }
}

export const setAlert = (isVisible, message) => {
    const payload = (!isVisible || !message) ? {
        isVisible: false,
        message: null
    } : { isVisible, message }
    return {
        type: SET_ALERT,
        payload
    }

}

// export const showModal = (message) => {
//     return {
//         type: SHOW_MODAL,
//         payload: message
//     }
// }

// export const setModal = (payload) => {
//     const payload = (!isVisible || !message) ? {
//         isVisible: false,
//         message: null
//     } : { isVisible, message }
//     return {
//         type: SET_MODAL,
//         payload
//     }

// }