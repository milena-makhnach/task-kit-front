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
		MuiDrawer: {
			styleOverrides: {
				paper: {
					position: 'relative',
					boxShadow: '1px 0px 0px 0px hsla(0,0%,100%,0.16)',
					height: '100%',
					minHeight: '100%',
					zIndex: 5,
					display: 'flex',
				},
			},
		},
	},
};
