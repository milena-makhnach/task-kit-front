import styles from './FilePopover.module.css';
import { Button, Typography } from '@mui/material';
import { useState, ChangeEvent, ReactNode, FC } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { uploadFile } from '@/shared/api/task';
import { Popover } from '@/shared/ui';

type FilePopoverPropsType = {
	children: ReactNode;
	anchorEl: HTMLElement | null;
	onClose: () => void;
};

export const FilePopover: FC<FilePopoverPropsType> = ({
	children,
	onClose,
	anchorEl,
}) => {
	const { task_id } = useParams();
	const queryClient = useQueryClient();

	const [value, setValue] = useState<File | null>(null);

	const { mutate } = useMutation({
		mutationFn: uploadFile,
		mutationKey: ['file'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['task'],
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
		<>
			{children}
			<Popover
				onClose={onClose}
				anchorElement={anchorEl}
				popoverTitle='Прикрепить вложение'>
				<Typography
					sx={{ fontSize: '14px', marginBottom: '5px' }}
					fontWeight={500}>
					Прикрепите файл с компьютера
				</Typography>
				<Typography sx={{ fontSize: '12px', marginBottom: '10px' }}>
					Вы можете просто перетянуть и отпустить файлы с компьютера,
					что бы выгрузить их.
				</Typography>

				<Button
					sx={{
						padding: 0,
						width: '100%',
						background: 'var(--bg-base-btn)',
						color: '#000',
						'&:hover': {
							background: 'var(--bg-base-btn-hover)',
						},
						textTransform: 'none',
						fontSize: '14px',
						cursor: 'pointer',
					}}>
					<label className={styles.fileUploadBtn} htmlFor='file'>
						<input
							type='file'
							id='file'
							style={{ display: 'none' }}
							onChange={handleChange}
						/>

						<p>
							{value ? 'Файл успешно добавлен' : 'Выбрать файл'}
						</p>
					</label>
				</Button>
			</Popover>
		</>
	);
};
