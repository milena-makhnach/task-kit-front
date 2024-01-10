import { Box, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import styles from './ExpendedBoardBgPhotos.module.css';
import { BoardMenuPhoto } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { getPhotos } from '@/shared/api/photos';
import { Photo } from '@/shared/types/photo';
import { isApiError } from '@/shared/type-guards/query-error-guard';
import { RootState, useAppDispatch } from '@/shared/store/store';
import { useSelector } from 'react-redux';
import { createBoardActions } from '@/features/create-board/slice/selectBgSlice';
import { TaskPhoto } from '@/shared/types/task-types';
import { ThemePalette } from '@/shared/theme/theme-palette';

export const ExpendedBoardBgPhotos: FC = () => {
	const dispatch = useAppDispatch();
	const { selectedPhoto } = useSelector(
		(state: RootState) => state.createBoard
	);

	const [photos, setPhotos] = useState<Photo[]>([]);

	const { data } = useQuery({ queryFn: getPhotos, queryKey: ['photos'] });

	const handleSelectPhoto = (photo: TaskPhoto, palette: ThemePalette) => {
		dispatch(createBoardActions.setBoardPhoto(photo));
		dispatch(createBoardActions.setPalette(palette));
	};

	useEffect(() => {
		if (data) {
			if (!isApiError(data)) {
				setPhotos(data);
			}
		}
	}, [data]);

	return (
		<Box>
			<Typography
				component='p'
				sx={{
					fontSize: '14px',
					fontWeight: 600,
					marginBottom: '8px',
				}}>
				Фотографии
			</Typography>
			<Box className={styles.photos}>
				{photos.slice(0, 6).map((item) => (
					<BoardMenuPhoto
						key={item.id}
						{...item}
						isSelected={Boolean(
							selectedPhoto && selectedPhoto.file === item.file
						)}
						handleSelectBg={handleSelectPhoto}
					/>
				))}
			</Box>
		</Box>
	);
};
