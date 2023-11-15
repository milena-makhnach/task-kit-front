import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
	BrowserRouter,
	createBrowserRouter,
	Route,
	Routes,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { baseTheme, themePalette } from './shared/theme';
import { routerConfig } from './shared/config/router-config';
import persistor, { store } from '@/shared/store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { Layout } from './pages/Layout';
import { ProfilePage } from './pages/ProfilePage';
import { BoardPage } from './pages/BoardPage';
import { HomePage } from './pages/HomePage';
import { Signup } from './features/signup/ui/Signup';
import { Login } from './features/login/ui/Login';

//@ts-nocheck
//@ts-ignore
const theme = createTheme({
	...baseTheme,
	palette: { primary: { ...themePalette.grayPalette } },
});

export const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<PersistGate loading={null} persistor={persistor}>
						<BrowserRouter>
							<Routes>
								<Route path='/' element={<Layout />}>
									<Route index element={<Login />} />
									<Route path='/sign-up' element={<Signup />} />
									<Route path='/home' element={<HomePage />} />
									<Route path='/board/:board_id' element={<BoardPage />} />
									<Route path='/profile' element={<ProfilePage />} />
								</Route>
							</Routes>
						</BrowserRouter>
					</PersistGate>
				</QueryClientProvider>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
