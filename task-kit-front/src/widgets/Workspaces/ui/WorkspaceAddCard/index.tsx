import { FC, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { CreateBoardMenu } from '@/features/create-board/ui/CreateBoardMenu';

import styles from './workspace-add-card.module.css';

export const WorkspaceAddCard: FC = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	console.log(anchorEl);
	return (
		<>
			<Box
				className={styles.addCard}
				onClick={(e) => setAnchorEl(e.currentTarget )}
			>
				<Box className={styles.cardFade} />
				<Typography className={styles.addCardTitle}>Создать доску</Typography>
				<CreateBoardMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
			</Box>
		</>
	);
};
