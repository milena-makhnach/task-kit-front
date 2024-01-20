import { FC, useEffect, useState } from 'react';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import dayjs from 'dayjs';
import { DatePopover } from '@/widgets/TaskPopovers/DatePopover/DatePopover';

import styles from './TaskCardDeadline.module.css';

type TaskCardDeadlinePropsType = {
	deadline: Date | null;
	completed: boolean;
	onChange: (isCompleted: boolean) => void;
};

export const TaskCardDeadline: FC<TaskCardDeadlinePropsType> = ({
	deadline,
	completed,
	onChange,
}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const [isCompleted, setIsCompleted] = useState<boolean>(false);

	useEffect(() => {
		setIsCompleted(dayjs(deadline).isBefore(dayjs(), 'day') && !!completed);
	}, [deadline, completed]);

	if (!deadline) return null;

	return (
		<Box>
			<Typography
				sx={{ fontSize: '12px', marginBottom: '5px' }}
				fontWeight={500}>
				Срок
			</Typography>
			<Box className={styles.wrapper}>
				<Checkbox
					size='small'
					color='secondary'
					checked={isCompleted}
					sx={{ width: '32px', height: '32px' }}
					onChange={(e) => {
						setIsCompleted(e.target.checked);
						onChange(isCompleted);
					}}
					disableRipple
				/>
				<DatePopover
					anchorEl={anchorEl}
					onClose={() => setAnchorEl(null)}>
					<Button
						sx={{
							background: 'var(--bg-base-btn)',
							textTransform: 'none',
							color: '#000',
							fontWeight: 500,
							fontSize: '14px',
							padding: '5px 10px',
							maxHeight: '32px',
							'&:hover': {
								background: 'var(--bg-base-btn-hover)',
							},
						}}
						onClick={(e) => setAnchorEl(e.currentTarget)}>
						{dayjs(deadline).format('DD.MM.YYYY')}
						<Box
							className={styles.deadlineStatus}
							sx={{
								color: isCompleted ? '#fff' : '#ae2a19',
								background: isCompleted ? '#1f845a' : '#ffedeb',
							}}>
							<span className={styles.deadlineStatusInner}>
								{dayjs(deadline).isBefore(dayjs(), 'day') &&
									!isCompleted &&
									'Просрочено'}
								{isCompleted && 'Выполнено'}
							</span>
						</Box>
						<KeyboardArrowDownIcon
							fontSize='small'
							sx={{
								marginLeft: '8px',
								fontWeight: 400,
							}}
						/>
					</Button>
				</DatePopover>
			</Box>
		</Box>
	);
};
