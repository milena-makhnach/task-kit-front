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

import { document } from '../api/document';
import { auth } from '../api/auth';
import { board } from '../api/board';
import userSlice from '@/entities/user/slice/user-slice';

const rootReducer = combineReducers({
	user: userSlice,
	[auth.reducerPath]: auth.reducer,
	[document.reducerPath]: document.reducer,
	[board.reducerPath]: board.reducer,
});

const persistConfig = {
	key: 'root',
	storage,
	blacckList: [auth.middleware, document.middleware, board.middleware],
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
		}).concat([auth.middleware, document.middleware, board.middleware]),
	devTools: process.env.NODE_ENV !== 'production',
});

export default persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
