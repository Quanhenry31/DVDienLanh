import { createSlice } from '@reduxjs/toolkit';

const contenSlice = createSlice({
    name: 'conten',
    initialState: {
        conten: {},
    },
    reducers: {
        addToConten: (state, action) => {
            state.conten = action.payload;
        },
    },
});
export const contenReducer = contenSlice.reducer;
export const { addToConten } = contenSlice.actions;
