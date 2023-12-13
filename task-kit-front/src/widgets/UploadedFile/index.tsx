import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FC } from 'react';

import { api } from '@/shared/api/base-query';

import styles from './UplodedFile.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type uploadedFileProps = {
	fileName: string;
	filePath: string;
	id: number;
};

const deleteFile = async (id: number) => {
	const { data } = await api.delete(`/document/${id}`);

	return data;
};

export const UploadedFile: FC<uploadedFileProps> = ({
	fileName,
	filePath,
	id,
}) => {
	const { board_id, task_id } = useParams();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: deleteFile,
		mutationKey: ['file'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['task', { task_id, board_id }],
			});
		},
	});
	return (
		<a
			href={`http://localhost:3000/${fileName}`}
			download={fileName}
			className={styles.file}>
			<Box className={styles.fileExten}>{fileName.split('.').pop()}</Box>
			<Box className={styles.fileInfo}>
				<Typography component='span' sx={{ fontSize: '16px' }}>
					{fileName}
				</Typography>
				<Typography
					component='span'
					sx={{ fontSize: '12px' }}
					onClick={(e) => {
						e.preventDefault();
						mutate(id);
					}}>
					Удалить
				</Typography>
			</Box>
		</a>
	);
};
