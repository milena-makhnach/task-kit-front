import styles from './DatePopover.module.css';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { getTask, updateTask } from '@/shared/api/task';
import { isApiError } from '@/shared/type-guards/query-error-guard';

export const DatePopover = () => {
	const [value, setValue] = useState<Dayjs | null>(null);

	const queryClient = useQueryClient();

	const { task_id, board_id } = useParams();

	const { data, isSuccess } = useQuery({
		queryFn: getTask,
		queryKey: [
			'tasks',
			{ task_id: task_id as string, board_id: board_id as string },
		],
	});

	const { mutate } = useMutation({
		mutationFn: updateTask,
		mutationKey: ['tasks'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['task', { task_id, board_id }],
			});
		},
	});

	const handleChangeDeadline = () => {
		const dateNum = value?.date();
		const date = dateNum ? new Date(dateNum) : null;
		mutate({ id: task_id as string, deadline: date });
	};

	useEffect(() => {
		if (isSuccess && data) {
			if (!isApiError(data)) {
				setValue(dayjs(data.deadline));
			}
		}
	}, [isSuccess, data]);

	return (
		<Box className={styles.container}>
			<Typography mb={2} textAlign='center'>
				Даты
			</Typography>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker
					value={value}
					onChange={(newValue: any) => setValue(newValue.$d)}
				/>
			</LocalizationProvider>
			<Box className={styles.btns}>
				<Button onClick={handleChangeDeadline}>Сохранить</Button>
				<Button
					color='error'
					onClick={() => {
						mutate({ id: task_id as string, deadline: null });
					}}>
					Удалить
				</Button>
			</Box>
		</Box>
	);
};
