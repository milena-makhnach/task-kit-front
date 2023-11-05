import { User } from '@/shared/types/user-data';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type userData = User & {
	isAuth: boolean;
};

const initialState: userData = {
	id: null,
	firstname: '',
	lastname: '',
	email: '',
	avatar: '',
	isAuth: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData(_, action: PayloadAction<User>) {
			return { ...action.payload, isAuth: true };
		},
		logoutUser(_) {
			return initialState;
		},
	},
});

export const { setUserData, logoutUser } = userSlice.actions;
export default userSlice.reducer;
