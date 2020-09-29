import {
    SET_HEADER_TAB
} from '../types';


export const setHeaderTab = (activeTab) => {
    return {
        type: SET_HEADER_TAB,
        payload: activeTab
    }
}