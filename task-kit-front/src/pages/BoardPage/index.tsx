import { Box } from '@mui/material';
import { FC, useState } from 'react';

import { Board } from '@/entities/board/ui/Board/Board';
import { BoardSidebar } from '@/widgets/BoardSidebar';

import styles from './board-page.module.css';
import { Photo } from '@/shared/types/photo';

export const BoardPage: FC = () => {
	const [boardBg, setBoardBg] = useState<Photo | string | null>(null);

	return (
		<Box
			sx={{
				position: 'relative',
				backgroundColor:
					boardBg && typeof boardBg === 'string' ? boardBg : '',
			}}
			className={styles.board}>
			{boardBg && typeof boardBg === 'object' && (
				<img
					className={styles.boardBackground}
					src={boardBg.file}
					alt={boardBg.alt_desc}
				/>
			)}
			<BoardSidebar />
			<Board setBoardBg={(bg: Photo | string | null) => setBoardBg(bg)} />
		</Box>
	);
};
