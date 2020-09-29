import { combineReducers } from 'redux';
import tasks from './tasksReducer';
import user from './userReducer';
import app from './appReducer';
import groups from './groupsReducer';

export const rootReducer = combineReducers({
    tasks,
    user,
    app,
    groups,
})