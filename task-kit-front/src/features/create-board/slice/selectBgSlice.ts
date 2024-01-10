import { ThemePalette } from '@/shared/theme/theme-palette';
import { TaskPhoto } from '@/shared/types/task-types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialStateType = {
	selectedPhoto: TaskPhoto | null;
	selectedColor: string | null;
	selectedPalette: ThemePalette | null;
};

const initialState: InitialStateType = {
	selectedPhoto: null,
	selectedColor: null,
	selectedPalette: {
		main: '#3e324e',
		dark: '#2a1e3a',
		light: '#2a1e3a',
	},
};

const createBoardSlice = createSlice({
	name: 'createBoard',
	initialState,
	reducers: {
		setBoardPhoto: (state, action: PayloadAction<TaskPhoto>) => {
			state.selectedPhoto = action.payload;
			state.selectedColor = null;
		},
		setBoardColor: (state, action: PayloadAction<string>) => {
			state.selectedColor = action.payload;
			state.selectedPhoto = null;
			state.selectedPalette = null;
		},
		setPalette: (state, action: PayloadAction<ThemePalette>) => {
			state.selectedPalette = action.payload;
		},
	},
});

export const { actions: createBoardActions, reducer: createBoardReducer } =
	createBoardSlice;
