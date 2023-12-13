import { Box } from '@mui/material';
import { FC } from 'react';

import { Board } from '@/shared/ui/Board/Board';
import { BoardSidebar } from '@/widgets/BoardSidebar';

import styles from './board-page.module.css';

export const BoardPage: FC = () => {
	return (
		<Box className={styles.board}>
			<BoardSidebar />
			<Board />
		</Box>
	);
};
