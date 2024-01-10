import { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { CreateBoardMenu } from '@/features/create-board/ui/CreateBoardMenu';

import styles from './workspace-add-card.module.css';
import { Popover } from '@/shared/ui';

export const WorkspaceAddCard: FC = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	return (
		<>
			<Box
				className={styles.addCard}
				onClick={(e) => setAnchorEl(e.currentTarget)}>
				<Box className={styles.cardFade} />
				<Typography className={styles.addCardTitle}>
					Создать доску
				</Typography>
			</Box>
			<Popover
				anchorElement={anchorEl}
				popoverTitle='Создать доску'
				onClose={() => setAnchorEl(null)}>
				<CreateBoardMenu />
			</Popover>
		</>
	);
};
