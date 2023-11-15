import { Input } from '@/shared/ui/index';
import { FC } from 'react';
import styles from './MembersPopover.module.css';
import Box from '@mui/material/Box/Box';
import { api } from '@/shared/api/base-query';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { MembersPopoverItem } from './ui/MembersPopoverItem';

// const getTask = async ({ queryKey }: { queryKey: any }) => {
// 	const [_, { task_id, board_id }] = queryKey;

// 	const { data } = await api.get(`/board/${board_id}/task/${task_id}`);

// 	return data;
// };

export const MembersPopover: FC = () => {
	const { id } = useParams();

	// const { data, isSuccess } = useQuery({
	// 	queryFn: getTask,
	// 	queryKey: ['task', { board_id: id, task_id }],
	// });

	return (
		<Box className={styles.container}>
			<p>Участники</p>
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
			<Box>
				<p>Участники доски</p>
				<Box>
					{/* <MembersPopoverItem /> */}
				</Box>
			</Box>
		</Box>
	);
};
