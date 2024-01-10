import { Box } from '@mui/material';
import { FC } from 'react';
import CheckIcon from '@mui/icons-material/Check';

import { CanvasImage } from '../CanvasImage';

import styles from './BoardMenuPhoto.module.css';
import { Photo } from '@/shared/types/photo';
import { ThemePalette } from '@/shared/theme/theme-palette';

type BoardMenuPhotoPropsType = Photo & {
	isSelected: boolean;
	handleSelectBg: (photo: Photo, palette: ThemePalette) => void;
};

export const BoardMenuPhoto: FC<BoardMenuPhotoPropsType> = ({
	isSelected,
	handleSelectBg,
	...photo
}) => {
	return (
		<CanvasImage
			getPalette={(palette) => {
				handleSelectBg(photo, palette);
			}}
			imgSrc={photo.file}>
			<Box className={styles.photoPicker}>
				{isSelected && (
					<Box className={styles.selected}>
						<CheckIcon sx={{ width: 20 }} />
					</Box>
				)}
				<Box className={styles.photo}>
					<img src={photo.file} alt={photo.alt_desc} />
				</Box>
			</Box>
		</CanvasImage>
	);
};
