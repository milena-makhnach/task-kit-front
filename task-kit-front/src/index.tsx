import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { baseTheme, themePalette } from './shared/theme';
import { Header } from './widgets/Header';
import { routerConfig } from './shared/config/router-config';
import persistor, { store } from '@/shared/store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

const router = createBrowserRouter(routerConfig);

const theme = createTheme({
	// ...baseTheme,
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
						<Header />
						<RouterProvider router={router}></RouterProvider>
					</PersistGate>
				</QueryClientProvider>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
