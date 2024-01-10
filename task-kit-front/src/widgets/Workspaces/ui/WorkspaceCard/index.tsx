import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Photo } from '@/shared/types/photo';

import styles from './workspace-card.module.css';
import { useAppDispatch } from '@/shared/store/store';
import { setTheme } from '@/shared/slices/theme';
import { findThemeToUse } from '@/shared/utils/find-theme-palette';
import { themePalette } from '@/shared/theme';
import { CanvasImage } from '@/shared/ui/CanvasImage';
import { ThemePalette } from '@/shared/theme/theme-palette';

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
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleClick = (palette: ThemePalette) => {
		if (cardBackground) {
			const theme = findThemeToUse(themePalette, cardBackground);
			dispatch(setTheme(theme));
		}

		if (cardPhoto) {
			dispatch(setTheme(palette));
		}

		navigate(`/board/${id}`);
	};

	return (
		<CanvasImage imgSrc={cardPhoto?.file || ''} getPalette={handleClick}>
			<Box
				className={styles.card}
				sx={{
					background: cardBackground ? cardBackground : '',
				}}>
				{cardPhoto && (
					<Box className={styles.cardImg}>
						<img src={cardPhoto.file} alt={cardPhoto.alt_desc} />
					</Box>
				)}
				<Box className={styles.cardFade} />
				<Box className={styles.cardContent}>
					<Typography
						className={styles.cardName}
						sx={{ fontWeight: 700 }}>
						{cardName}
					</Typography>
				</Box>
			</Box>
		</CanvasImage>
	);
};
