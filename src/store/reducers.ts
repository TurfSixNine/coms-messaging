import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user'
const rootReducers = combineReducers({
    user: userReducer
});

export default rootReducers;
