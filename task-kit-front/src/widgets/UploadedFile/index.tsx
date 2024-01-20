import { Box, Typography } from '@mui/material';
import { FC } from 'react';

import { api } from '@/shared/api/base-query';

import styles from './UplodedFile.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
import { deletedFile } from '@/shared/api/task';

dayjs.extend(relativeTime).locale('ru');

type uploadedFileProps = {
	fileName: string;
	filePath: string;
	createAt: string;
	id: number;
};

export const UploadedFile: FC<uploadedFileProps> = ({
	fileName,
	filePath,
	createAt,
	id,
}) => {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: deletedFile,
		mutationKey: ['file'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['task'],
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
				<Typography
					component='span'
					sx={{
						fontSize: '14px',
						display: 'block',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
					fontWeight={500}>
					{fileName}
				</Typography>
				<Typography
					component='p'
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						fontSize: '12px',
						columnGap: '25px',
					}}>
					Добавлено{' '}
					{dayjs()
						.locale('ru')
						.from(dayjs(new Date(createAt)), true)}{' '}
					назад
					<ul>
						<li>
							<Typography
								component='span'
								sx={{ fontSize: '12px' }}
								onClick={(e) => {
									e.preventDefault();
									mutate(id);
								}}>
								Удалить
							</Typography>
						</li>
					</ul>
				</Typography>
			</Box>
		</a>
	);
};
