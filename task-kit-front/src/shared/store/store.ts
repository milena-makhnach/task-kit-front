import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch } from 'react-redux';

import userSlice from '@/entities/user/slice/user-slice';
import themeSlice from '@/shared/slices/theme';
import { createBoardReducer } from '@/features/create-board/slice/selectBgSlice';

const rootReducer = combineReducers({
	user: userSlice,
	theme: themeSlice,
	createBoard: createBoardReducer,
});

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
});

export default persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
