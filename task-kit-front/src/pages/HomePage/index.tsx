import { FC, useRef, useState } from 'react';
import Box from '@mui/material/Box/Box';

import { Navbar } from '@/widgets/Navbar';
import { Workspaces } from '@/widgets/Workspaces/index';

import styles from './home-page.module.css';

export const HomePage: FC = () => {
	return (
		<Box className={styles.home}>
			<Navbar />
			<Box className={styles.content}>
				<Workspaces />
			</Box>
		</Box>
	);
};
