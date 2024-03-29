import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

interface AuthState {
	isAuthenticated: boolean;
	isGuest: boolean;
	token: string | null;
	user: User | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: null,
	token: null,
	isAuthenticated: false,
	isGuest: false,
	isLoading: false,
	error: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
			state.isAuthenticated = true;
			state.token = action.payload.token;
			state.user = action.payload.user;
			state.isLoading = false;
			state.error = null;
		},
		loginRequest: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		loginFailure: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.token = null;
			state.isGuest = false;
			state.user = null;
		},
		loginGuest: (state, action: PayloadAction<{ user: User }>) => {
			state.isGuest = true;
			state.user = action.payload.user;
		},
        updateAuthUser: (state, action: PayloadAction<{user: User}>) => {
            state.user = action.payload.user;
        }
	},
});

export const { loginSuccess, loginRequest, loginFailure, loginGuest, logout, updateAuthUser } = authSlice.actions;

export default authSlice.reducer;
