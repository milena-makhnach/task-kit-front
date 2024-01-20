import { Input, Popover } from '@/shared/ui/index';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MembersPopover.module.css';
import Box from '@mui/material/Box/Box';
import { useQuery } from '@tanstack/react-query';
import { MembersPopoverItem } from './ui/MembersPopoverItem';
import { List, Typography } from '@mui/material';
import { getTask } from '@/shared/api/task';
import { UserResponse } from '@/shared/types/user-data';
import { isApiError } from '@/shared/type-guards/query-error-guard';

type MembersPopoverPropsType = {
	children: ReactNode;
	anchorEl: HTMLElement | null;
	onClose: () => void;
	setTaskData: (id: number, data: any) => void;
};

export const MembersPopover: FC<MembersPopoverPropsType> = ({
	children,
	anchorEl,
	onClose,
}) => {
	const { task_id, board_id } = useParams();

	const [users, setUsers] = useState<UserResponse[]>([]);

	const { data, isSuccess } = useQuery({
		queryFn: getTask,
		queryKey: [
			'tasks',
			{ task_id: task_id as string, board_id: board_id as string },
		],
	});

	useEffect(() => {
		if (data && isSuccess) {
			if (!isApiError(data)) {
				setUsers(data.users);
			}
		}
	}, [isSuccess, data]);

	return (
		<>
			{children}
			<Popover
				anchorElement={anchorEl}
				popoverTitle='Участники'
				onClose={onClose}>
				<Input
					type='text'
					placeholder='Найти участников...'
					variant='outlined'
					fullWidth
					sx={{
						'& > .MuiInputBase-root': {
							height: '40px !important',
						},
					}}
				/>
				<Typography sx={{ marginInline: '10px' }}>
					Участники доски
				</Typography>
				<List>
					{users.map((user: any) => (
						<MembersPopoverItem
							key={user.id}
							name={user.first_name}
							lastname={user.last_name}
							avatar={user.avatar}
							isSelected={user.isWorking}
						/>
					))}
				</List>
			</Popover>
		</>
	);
};
