import { FC } from 'react';
import { Typography, Box } from '@mui/material';

import { WorkspaceCard } from './ui/WorkspaceCard';

import styles from './workspaces.module.css';
import { WorkspaceAddCard } from './ui/WorkspaceAddCard';
import { useGetAllBoardsQuery } from '@/shared/api/board';
import { Chip } from '../../shared/ui/Chip/Chip';


const mock = [
	{ id: 1, img: '', text: 'Доски' },
	{ id: 2, img: '', text: 'представления' },
	{ id: 3, img: '', text: 'Участники' },
	{id: 4, img: '', text: 'Настройки'},

]

export const Workspaces: FC = () => {
	const { data } = useGetAllBoardsQuery();

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
				{/* {data?.map((board) => (
					<WorkspaceCard
						cardBackground={'rgb(0, 121, 191)'}
						cardName={cardName}
					/>
				))} */}

				<WorkspaceCard
					cardBackground={'rgb(0, 121, 191)'}
					cardName={'jopa'}
				/>
				<WorkspaceAddCard />
			</Box>
		</Box>
	);
};
