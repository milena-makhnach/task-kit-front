import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ThemePalette } from '../theme/theme-palette';
import { themePalette } from '../theme';

type ThemeStateType = {
	theme: ThemePalette;
};

const initialState: ThemeStateType = {
	theme: { ...themePalette.defaultPalette },
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme(state, action: PayloadAction<ThemePalette>) {
			state.theme = { ...action.payload };
		},
	},
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
