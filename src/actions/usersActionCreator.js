import { CREATE_USER } from '../reducers/types';

export const createUser = (newUser) => {
    return {
        type: CREATE_USER,
        newUser
    }
}