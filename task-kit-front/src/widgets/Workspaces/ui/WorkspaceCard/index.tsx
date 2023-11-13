import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { Photo } from '@/shared/types/photo';

import styles from './workspace-card.module.css';

type workspaceCardProps = {
	cardName: string;
	cardBackground: string | null;
	cardPhoto: Photo | null;
	id: number;
};

export const WorkspaceCard: FC<workspaceCardProps> = ({
	cardName,
	cardBackground,
	cardPhoto,
	id,
}) => {
	return (
		<Link to={`/board/${id}`}>
			<Box
				className={styles.card}
				sx={{
					backgroundImage: `url(${cardPhoto ? cardPhoto.file : ''})`,
					background: cardBackground ? cardBackground : '',
				}}>
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
