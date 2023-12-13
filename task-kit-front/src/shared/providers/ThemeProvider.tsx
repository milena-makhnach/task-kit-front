import { FC, ReactNode, useEffect, useState } from 'react';
import {
	createTheme,
	ThemeProvider as Provider,
	Theme,
} from '@mui/material/styles';
import { baseTheme } from '../theme';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

type ThemeProviderPropsType = {
	children: ReactNode;
};

export const ThemeProvider: FC<ThemeProviderPropsType> = ({ children }) => {
	const { theme: rootTheme } = useSelector((state: RootState) => state.theme);

	const base = createTheme(baseTheme);

	const [theme, setTheme] = useState<Theme>(base);

	useEffect(() => {
		const theme = createTheme({
			...baseTheme,
			palette: {
				primary: { ...rootTheme },
			},
		});

		setTheme(theme);
	}, [rootTheme]);

	return <Provider theme={theme}>{children}</Provider>;
};
