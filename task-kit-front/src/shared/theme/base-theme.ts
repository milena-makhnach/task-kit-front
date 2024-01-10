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
				input: {
					padding: '12px !important',
				},
				multiline: {
					padding: 0,
					fontSize: '16px',
					height: 'unset',
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
					boxShadow: '1px 0px 0px 0px hsla(0,0%,100%,0.16)',
					height: '100%',
					minHeight: '100%',
					zIndex: 5,
					display: 'flex',
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					fontSize: '10px',
					fontWeight: 600,
					paddingInline: '5px',
					lineHeight: '80%',
					marginTop: '7px',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					overflow: 'hidden',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					lineHeight: 'normal',
					minWidth: 'unset',
				},
			},
		},
	},
};
