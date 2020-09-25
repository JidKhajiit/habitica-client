import { combineReducers } from 'redux';
import tasks from './tasksReducer';
import users from './usersReducer'

export const rootReducer = combineReducers({
    tasks,
    users
})