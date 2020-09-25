import { CREATE_USER } from './types'

const initialState = {
    myUser: {
        login: "",
        password: "",
        firstName: "",
        lastName: "Anonimous"
    },
    users: [],

}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            console.log("reducer pushed ", action.newUser);
            return { ...state, users: [...state.users, action.newUser], myUser: action.newUser }
        default: return state
    }
}