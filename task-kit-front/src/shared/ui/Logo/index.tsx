import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import styles from './logo.module.css';

import logo from '@/assets/icons/logo.svg';

export const Logo: FC = () => {
	return (
		<Box className={styles.logo}>
			<img className={styles.logoIcon} src={logo} alt={'logo'} />
			<Typography
				component='span'
				className={styles.logoText}
				sx={{ fontWeight: 700, fontFamily: ['Glory', 'sans-serif'].join(',') }}>
				Team Kit
			</Typography>
		</Box>
	);
};
