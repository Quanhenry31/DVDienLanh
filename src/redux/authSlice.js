// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiLoginSuccess } from '../apis/authService';

// Async action for login
export const loginSuccess = createAsyncThunk(
    'auth/loginSuccess',
    async ({ email, tokenLogin }, { rejectWithValue }) => {
        try {
            const response = await apiLoginSuccess(email, tokenLogin);
            if (response?.data.err === 0) {
                return response.data.token;
            } else {
                return rejectWithValue('Login failed');
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        token: null,
    },
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginSuccess.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.token = action.payload;
            })
            .addCase(loginSuccess.rejected, (state) => {
                state.isLoggedIn = false;
                state.token = null;
            });
    },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
