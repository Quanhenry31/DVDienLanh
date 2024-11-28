import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
    },
    reducers: {
        addToUser: (state, action) => {
            state.user = action.payload;
        },
    },
});
export const userReducer = userSlice.reducer;
export const { addToUser } = userSlice.actions;
