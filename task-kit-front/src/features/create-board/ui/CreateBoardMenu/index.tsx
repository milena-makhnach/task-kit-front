import { FC, useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';

import { themePalette } from '@/shared/theme/index';
import { TaskPhoto } from '@/shared/types/task-types';
import { Input } from '@/shared/ui';

import styles from '../create-board-menu.module.css';

import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getPhotos } from '@/shared/api/photos';
import { createBoard } from '@/shared/api/board';
import { isApiError } from '@/shared/type-guards/query-error-guard';
import { Photo } from '@/shared/types/photo';
import { RootState, useAppDispatch } from '@/shared/store/store';
import { setTheme } from '@/shared/slices/theme';
import { findThemeToUse } from '@/shared/utils/find-theme-palette';
import { BoardMenuColor, BoardMenuPhoto } from '@/shared/ui';
import { BoardPreview } from '../BoardPreview';
import { usePaletteColors } from '@/shared/hooks';
import { ExpendedBoardBgMenu } from '@/widgets/ExpendedBoardsBgMenu';
import { createBoardActions } from '@/features/create-board/slice/selectBgSlice';
import { useSelector } from 'react-redux';
import { ThemePalette } from '@/shared/theme/theme-palette';

export const CreateBoardMenu: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { selectedPhoto, selectedColor } = useSelector(
		(state: RootState) => state.createBoard
	);

	const paletteColors = usePaletteColors();

	const [photos, setPhotos] = useState<Photo[]>([]);
	const [colors, setColors] = useState<string[]>(paletteColors.slice(0, 5));
	const [boardName, setBoardName] = useState<string>('');

	const { data } = useQuery({
		queryKey: ['photos'],
		queryFn: getPhotos,
	});

	const {
		mutate,
		data: newBoard,
		isPending: isLoading,
	} = useMutation({ mutationFn: createBoard, mutationKey: ['boards'] });

	const handleCreateBoard = () => {
		const board = {
			name: boardName,
			bg_color: selectedColor || null,
			photo_id: selectedPhoto ? selectedPhoto.id : null,
		};

		mutate(board);
	};

	const handleSelectBg = (bg: string | TaskPhoto, palette?: ThemePalette) => {
		if (typeof bg === 'object') {
			dispatch(createBoardActions.setBoardPhoto(bg));
			palette && dispatch(createBoardActions.setPalette(palette));
		} else {
			dispatch(createBoardActions.setBoardColor(bg));
		}
	};

	const handleSelectFirstBg = () => {
		if (selectedPhoto) {
			const photoIndex = photos.findIndex(
				(item) => item.id === selectedPhoto.id
			);

			if (photoIndex === -1) {
				setPhotos((prev) => [
					selectedPhoto,
					...prev.slice(1, prev.length),
				]);
			}
		}

		if (selectedColor) {
			const isColorExists = colors.includes(selectedColor);

			if (!isColorExists) {
				setColors((prev) => [
					selectedColor,
					...prev.slice(1, prev.length),
				]);
			}
		}
	};

	useEffect(() => {
		if (data) {
			if (!isApiError(data)) {
				handleSelectBg(data[0]);
				setPhotos(data.slice(0, 4));
			}
		}
	}, [data]);

	useEffect(() => {
		if (newBoard) {
			if (!isApiError(newBoard)) {
				navigate(`/board/${newBoard?.id}`);

				if (selectedColor) {
					const theme = findThemeToUse(themePalette, selectedColor);
					dispatch(setTheme(theme));
				}
			}
		}
	}, [newBoard]);

	useEffect(() => {
		handleSelectFirstBg();
	}, [selectedColor, selectedPhoto]);

	return (
		<>
			<BoardPreview
				selectedColor={selectedColor}
				selectedPhoto={selectedPhoto ? selectedPhoto.file : null}
			/>
			<Box className={styles.menuPhotos}>
				<Typography
					className={styles.menuPhotosLabel}
					component='p'
					sx={{
						fontSize: '14px',
						fontWeight: 600,
						marginBottom: '8px',
					}}>
					Фон
				</Typography>
				<Box className={styles.menuPhotoPicker}>
					{photos.map((item) => (
						<BoardMenuPhoto
							key={item.id}
							{...item}
							isSelected={Boolean(
								selectedPhoto && selectedPhoto.id === item.id
							)}
							handleSelectBg={handleSelectBg}
						/>
					))}
				</Box>
				<Box className={styles.menuColorPicker}>
					{colors.map((item) => (
						<BoardMenuColor
							key={item}
							isSelected={Boolean(
								selectedColor && selectedColor === item
							)}
							color={item}
							handleSelectBg={() => handleSelectBg(item)}
						/>
					))}
					<ExpendedBoardBgMenu />
				</Box>
			</Box>
			<form>
				<Input
					name='title'
					label='Заголовок доски'
					placeholder='Заголовок доски'
					type='text'
					value={boardName}
					onChange={(e) => setBoardName(e.target.value)}
					error={!boardName}
					errorText='Укажите название доски'
					fullWidth
				/>
				<Button
					variant='contained'
					disabled={!boardName || isLoading}
					fullWidth
					sx={{
						marginTop: '10px',
						height: '50px',
						textTransform: 'none',
					}}
					onClick={handleCreateBoard}>
					Создать доску
				</Button>
			</form>
		</>
	);
};
