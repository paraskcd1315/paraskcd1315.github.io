import appReducer from '../features/app/appSlice';
import toastReducer from '../features/toast/toastSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		app: appReducer,
		toast: toastReducer,
	},
});
