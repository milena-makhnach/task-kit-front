import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, IconButton, OutlinedInput } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import styles from './CreateTaskBtn.module.css';

type CreateTaskBtnPropsType = {
	handleCreateTask: (taskName: string) => void;
};

export const CreateTaskBtn: FC<CreateTaskBtnPropsType> = ({
	handleCreateTask,
}) => {
	const { pathname } = useLocation();

	const [isCreation, setIsCreation] = useState<boolean>(false);
	const [taskName, setTaskName] = useState<string>('');

	const handleCloseCreation = () => {
		setIsCreation(false);
		setTaskName('');
	};

	const handleCreate = () => {
		if (!setTaskName) {
			setIsCreation(false);
			return;
		}
		handleCreateTask(taskName);
		handleCloseCreation();
	};

	useEffect(() => {
		isCreation && setIsCreation(false);
	}, [pathname]);

	return (
		<Box>
			{isCreation ? (
				<Box className={styles.createColumn}>
					<OutlinedInput
						sx={{
							padding: 0,
							'& textarea': {
								height: 'unset !important',
							},
							'&.MuiInputBase-root': {
								'&.Mui-focused fieldset': {
									borderColor: 'var(--base-theme-clr)',
								},
							},
						}}
						multiline
						minRows={3}
						maxRows={5}
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
						placeholder='Заголовок задачи'
					/>
					<Box className={styles.btnsContainer}>
						<Button
							sx={{
								height: '40px',
								color: '#fff',
								background: 'var(--base-theme-clr)',
								textTransform: 'none',
								'&:hover': {
									background: 'var(--base-theme-dark-clr)',
								},
							}}
							onClick={handleCreate}>
							Добавить задачу
						</Button>
						<IconButton
							sx={{ width: '35px', height: '35px' }}
							onClick={handleCloseCreation}>
							<CloseIcon sx={{ width: '20px', height: '20px' }} />
						</IconButton>
					</Box>
				</Box>
			) : (
				<Button
					sx={{
						textTransform: 'none',
						color: '#000',
						fontSize: '14px',
					}}
					variant='text'
					onClick={() => setIsCreation(true)}>
					+ Добавить задачу
				</Button>
			)}
		</Box>
	);
};
