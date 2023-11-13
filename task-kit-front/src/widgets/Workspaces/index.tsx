import { FC } from 'react';
import { Typography, Box } from '@mui/material';
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query';
import { WorkspaceCard } from './ui/WorkspaceCard';

import styles from './workspaces.module.css';
import { WorkspaceAddCard } from './ui/WorkspaceAddCard';
import { useGetAllBoardsQuery } from '@/shared/api/board';
import { Chip } from '../../shared/ui/Chip/Chip';
import { CreateBoard, BoardResponse } from '../../shared/types/board';
import { api } from '@/shared/api/base-query';

const getAllBoards = async () => {
	const { data } = await api.get('/board/');

	return data;
};

export const Workspaces: FC = () => {
	const { data } = useQuery<BoardResponse[]>({
		queryKey: ['boards'],
		queryFn: getAllBoards,
	});

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
				<p>Hello suka</p>
			</Box>
			<Box className={styles.cardsWrapper}>
				{data?.map((board) => (
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
