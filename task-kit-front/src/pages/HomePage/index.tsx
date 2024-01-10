import { FC } from 'react';
import Box from '@mui/material/Box/Box';

import { Navbar } from '@/widgets/Navbar';
import { Boards } from '@/widgets/Workspaces/index';

import styles from './home-page.module.css';

export const HomePage: FC = () => {
	return (
		<Box className={styles.home}>
			<Navbar />
			<Box className={styles.content}>
				<Boards />
			</Box>
		</Box>
	);
};
