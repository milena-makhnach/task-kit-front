import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import styles from './logo.module.css';

import logo from '@/assets/icons/logo.svg';
import { useNavigate } from 'react-router-dom';

export const Logo: FC = () => {
	const navigate = useNavigate();
	return (
		<Box sx={{cursor: 'pointer'}} className={styles.logo} role='link' onClick={() => navigate('/')}>
			<img className={styles.logoIcon} src={logo} alt={'logo'} />
			<Typography
				component='span'
				className={styles.logoText}
				sx={{ fontWeight: 700, fontFamily: ['Glory', 'sans-serif'].join(',') }}
			>
				Team Kit
			</Typography>
		</Box>
	);
};
