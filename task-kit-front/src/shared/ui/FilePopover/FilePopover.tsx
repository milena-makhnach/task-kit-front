import styles from './FilePopover.module.css';
import Box from '@mui/material/Box/Box';
import { Button, Input, InputAdornment, Typography } from '@mui/material';
// import { MuiFileInput } from 'mui-file-input';
import { useState, useCallback, ChangeEvent } from 'react';
import { api } from '@/shared/api/base-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { uploadFile } from '@/shared/api/task';

export const FilePopover = () => {
	const { task_id, board_id } = useParams();
	const queryClient = useQueryClient();

	const [value, setValue] = useState<File | null>(null);

	const { mutate } = useMutation({
		mutationFn: uploadFile,
		mutationKey: ['file'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['task', { task_id, board_id }],
			});
		},
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;

		files && setValue(files[0]);

		if (files) {
			const formData = new FormData();

			formData.append('file', files[0]);
			formData.append('task_id', String(task_id));
			mutate(formData);
		}
	};

	return (
		<Box className={styles.container}>
			<Typography>Прикрепить</Typography>
			<Typography>Прикрепите файл с компьютера</Typography>
			<Typography>
				Вы можете просто перетянуть и отпустить файлы с компьютера, что
				бы выгрузить их.
			</Typography>

			<input style={{ display: 'none' }} />

			<label className={styles.fileInput} htmlFor='file'>
				<input
					type='file'
					id='file'
					style={{ display: 'none' }}
					onChange={handleChange}
				/>

				<p>{value ? 'Файл успешно добавлен' : 'Выбрать файл'}</p>
			</label>
		</Box>
	);
};
