import { combineReducers } from 'redux';
import tasks from './tasksReducer';
import myUser from './myUserReducer';
import app from './appReducer';
import groups from './groupsReducer';
import users from './usersReducer'

export const rootReducer = combineReducers({
    tasks,
    myUser,
    users,
    app,
    groups,
})