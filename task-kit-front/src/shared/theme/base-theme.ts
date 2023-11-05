export const baseTheme = {
	typography: {
		fontFamily: ['Montserrat', 'sans-serif'].join(','),
		fontSize: 16,
		lineHeight: 'normal',
	},
	components: {
		MuiInputBase: {
			styleOverrides: {
				root: {
					height: '50px',
				},
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					fontSize: '14px',
					fontWeight: 600,
				},
			},
		},
	},
};
