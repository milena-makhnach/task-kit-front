import { FC, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import styles from '../../TaskExpendedCard.module.css';
import { Box, Button, Typography } from '@mui/material';

import taskDesc from '@/assets/icons/task-desc.svg';

type TaskDescriptionPropsType = {
	desc: string | null;
	updateTaskDesc: (desc: string) => void;
};

export const TaskDescription: FC<TaskDescriptionPropsType> = ({
	desc,
	updateTaskDesc,
}) => {
	const [value, setValue] = useState<string>('');
	const [isTextEditorOpen, setIsTextEdittorOpen] = useState<boolean>(false);

	useEffect(() => {
		setValue(desc || '');
	}, [desc]);

	return (
		<Box className={styles.descript}>
			<Box className={styles.taskDescIconWrapper}>
				<img src={taskDesc} alt='Task description icon.' />
			</Box>
			<Typography fontWeight={500} mb={1} sx={{ fontSize: '14px' }}>
				Описание
			</Typography>

			{isTextEditorOpen ? (
				<>
					<ReactQuill
						className={styles.textEditor}
						theme='snow'
						value={value}
						onChange={setValue}
					/>
					<Box className={styles.btnWrapper}>
						<Button
							sx={{ textTransform: 'none', fontSize: '14px' }}
							onClick={() => {
								updateTaskDesc(value);
								setIsTextEdittorOpen(false);
							}}>
							Сохранить
						</Button>
						<Button
							sx={{
								textTransform: 'none',
								fontSize: '14px',
								backgroundColor: 'transparent',
								color: '#000',
								'&:hover': {
									backgroundColor: 'var(--bg-base-btn)',
								},
							}}
							onClick={() => {
								setIsTextEdittorOpen(false);
								setValue(desc || '');
							}}>
							Отмена
						</Button>
					</Box>
				</>
			) : (
				<button
					onClick={() => setIsTextEdittorOpen(true)}
					className={`${styles.openEditorBtn} ${
						!isTextEditorOpen && value ? styles.filledWithText : ''
					}`}>
					{value ? (
						<span
							dangerouslySetInnerHTML={{
								__html: value,
							}}
						/>
					) : (
						'Добавить более подробное описание...'
					)}
				</button>
			)}
		</Box>
	);
};
