import { createSlice } from '@reduxjs/toolkit';

export const blockchainSlide = createSlice({
	name: 'blockchain',
	initialState: [
		{
			contracts:[]}
	],
	reducers: {
		updateData: (state, action) => {
			
			state.push(todo);
		},

	},
});


export const { updateData } = blockchainSlide.actions;

export default blockchainSlide.reducer;