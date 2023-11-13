import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch } from 'react-redux';

import { photos } from '../api/photos';
import { auth } from '../api/auth';
import { board } from '../api/board';
import { column } from '../api/column';
import userSlice from '@/entities/user/slice/user-slice';
import { task } from '../api/task';

const rootReducer = combineReducers({
	user: userSlice,
	[auth.reducerPath]: auth.reducer,
	[photos.reducerPath]: photos.reducer,
	[board.reducerPath]: board.reducer,
	[column.reducerPath]: column.reducer,
	[task.reducerPath]: task.reducer,
});

const persistConfig = {
	key: 'root',
	storage,
	blacckList: [
		auth.middleware,
		board.middleware,
		photos.middleware,
		column.middleware,
		task.middleware,
	],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}).concat([
			auth.middleware,
			board.middleware,
			photos.middleware,
			column.middleware,
			task.middleware,
		]),
	devTools: process.env.NODE_ENV !== 'production',
});

export default persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
