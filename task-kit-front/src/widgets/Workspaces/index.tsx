import { FC, useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query';
import { WorkspaceCard } from './ui/WorkspaceCard';

import styles from './workspaces.module.css';
import { WorkspaceAddCard } from './ui/WorkspaceAddCard';
import { BoardResponse } from '../../shared/types/board';
import { UserAvatar } from '@/entities/user/ui/UserAvatar';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/store/store';
import { getAllBoards } from '@/shared/api/board';
import { isApiError } from '@/shared/type-guards/query-error-guard';

export const Boards: FC = () => {
	const [boards, setBoards] = useState<BoardResponse[]>([]);

	const { data, isSuccess } = useQuery({
		queryKey: ['boards'],
		queryFn: getAllBoards,
	});

	const user = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (isSuccess && data) {
			if (!isApiError(data)) {
				setBoards(data);
			}
		}
	}, [isSuccess, data]);

	return (
		<Box>
			<Typography
				className={styles.workspacesTitle}
				sx={{ fontWeight: 700 }}
				mb={2}
				component='h2'>
				Ваши рабочие пространства
			</Typography>
			<Box className={styles.contentHeader}>
				<UserAvatar
					firstname={user.firstname}
					avatar={user.avatar}
					lastname={user.lastname}
				/>
				<Typography sx={{ fontWeight: 500 }}>
					{user.firstname} {user.lastname}
				</Typography>
			</Box>
			<Box className={styles.cardsWrapper}>
				{boards.map((board) => (
					<WorkspaceCard
						key={board.id}
						id={board.id}
						cardBackground={board.bg_color}
						cardName={board.name}
						cardPhoto={board.photo}
					/>
				))}
				<WorkspaceAddCard />
			</Box>
		</Box>
	);
};
