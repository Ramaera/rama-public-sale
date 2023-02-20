import { configureStore } from '@reduxjs/toolkit';
import blockchain from './todoSlice';

export default configureStore({
	reducer: {
		blockchain: blockchain,
	},
});