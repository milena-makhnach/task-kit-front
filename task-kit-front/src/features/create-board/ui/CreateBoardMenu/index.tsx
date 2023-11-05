import { FC, useMemo, useState, useEffect, ChangeEvent } from 'react';
import {
	Menu,
	Typography,
	Box,
	IconButton,
	Button,
	InputLabel,
	FormHelperText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useGetPhotosQuery } from '@/shared/api/document';
import { themePalette } from '@/shared/theme/index';
import { TaskPhoto } from '@/shared/types/task-types';
import { Input } from '@/shared/ui';
import { useCreateBoardMutation } from '@/shared/api/board';

import createTaskIcon from '@/assets/icons/create-task.svg';

import styles from './create-board-menu.module.css';

type createBoardMenuProps = {
	anchorEl: HTMLElement | null;
	setAnchorEl: (el: HTMLElement | null) => void;
};

export const CreateBoardMenu: FC<createBoardMenuProps> = ({
	anchorEl,
	setAnchorEl,
}) => {
	const [selectedPhoto, setSelectedPhoto] = useState<TaskPhoto | null>(null);
	const [selectedColor, setSelectedColor] = useState<string | null>(null);
	const [boardName, setBoardName] = useState<string>('');

	const { data, isSuccess } = useGetPhotosQuery();
	const [createBoard] = useCreateBoardMutation();

	const onBoardNameChangge = (e: ChangeEvent<HTMLInputElement>) => {
		setBoardName(e.target.value);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSelectBg = (bg: string | TaskPhoto) => {
		if (typeof bg === 'object') {
			setSelectedPhoto(bg);
			setSelectedColor(null);
		} else {
			setSelectedPhoto(null);
			setSelectedColor(bg);
		}
	};

	const palletteColors = useMemo(() => {
		return Object.entries(themePalette).map(([_, value]) => value.main);
	}, []);

	useEffect(() => {
		if (isSuccess && data) {
			handleSelectBg(data[0]);
		}
	}, [isSuccess, data]);

	return (
		<Menu
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={handleClose}
			MenuListProps={{
				'aria-labelledby': 'create-task',
				sx: {
					paddingTop: 0,
					minWidth: '300px',
				},
			}}
			sx={{ paddintTop: 0, borderRadius: '8px', minWidth: '300px' }}>
			<Box className={styles.menuHeader}>
				<Typography
					className={styles.menuTitle}
					sx={{ lineHeight: '40px' }}>
					Создать доску
				</Typography>
				<IconButton className={styles.menuClose} onClick={handleClose}>
					<CloseIcon />
				</IconButton>
			</Box>
			<Box className={styles.menuContent}>
				<Box className={styles.preview}>
					<Box
						className={styles.previewContent}
						sx={{
							backgroundImage: `url(${
								selectedPhoto ? selectedPhoto.file : ''
							})`,
							background: selectedColor ? selectedColor : '',
						}}>
						<img src={createTaskIcon} alt='create task' />
					</Box>
				</Box>
				<Box className={styles.menuPhotos}>
					<Typography className={styles.menuPhotosLabel}>
						Фон
					</Typography>
					<Box>
						<Box className={styles.menuPhotoPicker}>
							{data?.map((photo) => (
								<Box
									className={styles.menuPhotoPickerItem}
									key={photo.id}
									onClick={() => handleSelectBg(photo)}>
									<Box className={styles.menuPhoto}>
										<img
											src={photo.file}
											alt={photo.alt_desc}
										/>
									</Box>
								</Box>
							))}
						</Box>
						<Box className={styles.menuColorPicker}>
							{palletteColors.slice(0, 5).map((color) => (
								<Box
									className={styles.menuColorPickerItem}
									key={color}
									onClick={() => handleSelectBg(color)}>
									<Box
										className={styles.menuPhoto}
										sx={{ backgroundColor: color }}></Box>
								</Box>
							))}
						</Box>
					</Box>
				</Box>
				<form>
					<InputLabel className={styles.formLabel} required>
						Заголовок доски
					</InputLabel>
					<Input
						placeholder='Заголовок доски'
						type='text'
						value={boardName}
						onChange={onBoardNameChangge}
						fullWidth
					/>
					{!boardName && (
						<FormHelperText>Укажите название доски</FormHelperText>
					)}

					<Button
						color='primary'
						variant='contained'
						disabled={!boardName}
						fullWidth
						sx={{ marginTop: '16px' }}>
						Создать доску
					</Button>
				</form>
			</Box>
		</Menu>
	);
};
