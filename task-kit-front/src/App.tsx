import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import persistor, { store } from '@/shared/store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import './variables.css';

import { Routing } from './Routing';
import { ThemeProvider } from './shared/providers';

export const queryClient = new QueryClient();

export const App: FC = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<ThemeProvider>
					<QueryClientProvider client={queryClient}>
						<PersistGate loading={null} persistor={persistor}>
							<Routing />
						</PersistGate>
					</QueryClientProvider>
				</ThemeProvider>
			</BrowserRouter>
		</Provider>
	);
};
