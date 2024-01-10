import { getPhotos } from '@/shared/api/photos';
import { isApiError } from '@/shared/type-guards/query-error-guard';
import { Photo } from '@/shared/types/photo';
import { BoardMenuPhoto, Input } from '@/shared/ui';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';

import styles from './AllBoardPhotos.module.css';
import { TaskPhoto } from '@/shared/types/task-types';
import { RootState, useAppDispatch } from '@/shared/store/store';
import { useSelector } from 'react-redux';
import { createBoardActions } from '@/features/create-board/slice/selectBgSlice';
import { ThemePalette } from '@/shared/theme/theme-palette';

export const AllBoardPhotos: FC = () => {
	const dispatch = useAppDispatch();
	const { selectedPhoto } = useSelector(
		(state: RootState) => state.createBoard
	);

	const [photos, setPhotos] = useState<Photo[]>([]);
	const [filterTerm, setFilterTerm] = useState<string>('');

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
			<Input
				placeholder='Фотографии'
				name='photos'
				label='Фотографии'
				value={filterTerm}
				onChange={(e) => setFilterTerm(e.target.value)}
			/>
			<Box className={styles.photosWrapper}>
				<Box className={styles.photos}>
					{photos
						.filter((item) => item.alt_desc.includes(filterTerm))
						.map((item) => (
							<BoardMenuPhoto
								key={item.id}
								{...item}
								isSelected={Boolean(
									selectedPhoto &&
										selectedPhoto.file === item.file
								)}
								handleSelectBg={handleSelectPhoto}
							/>
						))}
				</Box>
			</Box>
		</Box>
	);
};
