import styles from './DatePopover.module.css';
import { FC, ReactNode, useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
	Box,
	Button,
	Checkbox,
	OutlinedInput,
	Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';

import { getTask, updateTask } from '@/shared/api/task';
import { isApiError } from '@/shared/type-guards/query-error-guard';
import { Popover } from '@/shared/ui';
import { StaticDatePicker } from '@mui/x-date-pickers';

type DatePopoverPropsType = {
	children: ReactNode;
	anchorEl: HTMLElement | null;
	onClose: () => void;
};

export const DatePopover: FC<DatePopoverPropsType> = ({
	children,
	anchorEl,
	onClose,
}) => {
	const { task_id, board_id } = useParams();
	const queryClient = useQueryClient();

	const tomorrow = dayjs().add(1, 'day');
	const [value, setValue] = useState<Dayjs | null>(tomorrow);

	const { data, isSuccess } = useQuery({
		queryFn: getTask,
		queryKey: [
			'task',
			{ task_id: task_id as string, board_id: board_id as string },
		],
	});

	const { mutate } = useMutation({
		mutationFn: updateTask,
		mutationKey: ['task'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['task'],
			});
		},
	});

	const handleChangeDeadline = () => {
		const date = value?.isValid() ? value?.toDate() : dayjs().toDate();
		mutate({ id: task_id as string, deadline: date });
		onClose();
	};

	const handleDeleteDate = () => {
		mutate({ id: task_id as string, deadline: null });
		onClose();
	};

	useEffect(() => {
		if (isSuccess && data) {
			if (!isApiError(data)) {
				data.deadline && setValue(dayjs(data.deadline));
			}
		}
	}, [isSuccess, data]);

	return (
		<>
			{children}
			<Popover
				onClose={onClose}
				anchorElement={anchorEl}
				popoverTitle='Даты'>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<StaticDatePicker
						value={value}
						slotProps={{
							actionBar: { actions: [] },
							toolbar: {
								hidden: true,
							},
						}}
						onChange={(newValue) => setValue(newValue)}
					/>
				</LocalizationProvider>
				<Box>
					<Typography
						sx={{ fontSize: '12px', marginBottom: '5px' }}
						fontWeight={500}>
						Срок
					</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '10px',
							gap: '5px',
						}}>
						<Checkbox
							color='secondary'
							checked={Boolean(value)}
							onChange={(e) =>
								setValue(e.target.checked ? tomorrow : null)
							}
						/>
						<OutlinedInput
							sx={{
								maxWidth: '120px',
								height: '40px',
								fontSize: '14px',
								'&.MuiInputBase-root': {
									height: '40px',
								},
							}}
							value={
								value?.isValid()
									? value?.format('DD.MM.YYYY')
									: ''
							}
							color='secondary'
							placeholder='ДД.ММ.ГГГГ'
							readOnly
							disabled={!value?.isValid()}
						/>
					</Box>
				</Box>
				<Box className={styles.btns}>
					<Button
						sx={{
							background: 'var(--base-theme-clr)',
							textTransform: 'none',
							fontSize: '14px',
							color: '#fff',
							padding: '10px 0',
							'&:hover': {
								background: 'var(--base-theme-dark-clr)',
							},
						}}
						onClick={handleChangeDeadline}>
						Сохранить
					</Button>
					<Button
						sx={{
							background: 'var(--bg-base-btn)',
							textTransform: 'none',
							color: '#000',
							fontSize: '14px',
							padding: '10px 0',
							'&:hover': {
								background: 'var(--bg-base-btn-hover)',
							},
						}}
						onClick={handleDeleteDate}>
						Удалить
					</Button>
				</Box>
			</Popover>
		</>
	);
};
