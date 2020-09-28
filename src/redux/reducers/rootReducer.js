import { combineReducers } from 'redux';
import tasks from './tasksReducer';
import user from './userReducer'

export const rootReducer = combineReducers({
    tasks,
    user
})