import {
    SHOW_ALERT,
    SET_ALERT
} from '../types';

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