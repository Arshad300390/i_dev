import userReducer from '../slices/userSlice';
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
   
        user: userReducer,
   
})
const store = configureStore({reducer: rootReducer})
export {store}