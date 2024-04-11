import {configureStore} from '@reduxjs/toolkit';
import authReducers from './reducers/authReducer';

const store = configureStore({
	reducer:{
		user: authReducers,
	}
})

export default store;