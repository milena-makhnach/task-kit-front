import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './workspace-card.module.css';

type workspaceCardProps = {
	cardName: string;
	cardBackground: string;
};

export const WorkspaceCard: FC<workspaceCardProps> = ({
	cardName,
	cardBackground,
}) => {
	return (
		<Link to='/home'>
			<Box className={styles.card} sx={{ background: cardBackground }}>
				<Box className={styles.cardFade} />
				<Box className={styles.cardContent}>
					<Typography
						className={styles.cardName}
						sx={{ fontWeight: 700 }}>
						{cardName}
					</Typography>
				</Box>
			</Box>
		</Link>
	);
};
