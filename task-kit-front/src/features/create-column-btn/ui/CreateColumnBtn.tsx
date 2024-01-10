import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, IconButton, OutlinedInput } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import styles from './CreateColumnBtn.module.css';

type CreateColumnBtnPropsType = {
	handleCreateColumn: (columnName: string) => void;
};

export const CreateColumnBtn: FC<CreateColumnBtnPropsType> = ({
	handleCreateColumn,
}) => {
	const { pathname } = useLocation();

	const [isCreation, setIsCreation] = useState<boolean>(false);
	const [columnName, setColumnName] = useState<string>('');

	const handleCloseCreation = () => {
		setIsCreation(false);
		setColumnName('');
	};

	const handleCreate = () => {
		if (!columnName) {
			setIsCreation(false);
			return;
		}

		handleCloseCreation();
		handleCreateColumn(columnName);
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
							height: '40px',
							'&.MuiInputBase-root': {
								height: '40px',
								'&.Mui-focused fieldset': {
									borderColor: 'var(--base-theme-clr)',
								},
							},
						}}
						value={columnName}
						onChange={(e) => setColumnName(e.target.value)}
						placeholder='Заголовок списка'
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
							Добавить колонку
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
						padding: '15px',
						borderRadius: '15px',
						backgroundColor: '#ffffff33',
						color: '#fff',
						textTransform: 'none',
						whiteSpace: 'nowrap',
						boxShadow: '0 2px 4px 0 rgba(36, 36, 40, 0.1)',
						'&:hover': {
							backgroundColor: '#ffffff16',
						},
					}}
					onClick={() => setIsCreation(true)}>
					+ Добавить еще одну колонку
				</Button>
			)}
		</Box>
	);
};
