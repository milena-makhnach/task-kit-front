import { FC, useEffect, useState } from 'react';
import { IconButton, List, Divider, Box } from '@mui/material';
import { useSelector } from 'react-redux';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useQuery } from '@tanstack/react-query';
import { isApiError } from '@/shared/type-guards/query-error-guard';
import { BoardSidebarItem } from './ui/BoardSidebarItem';
import { BoardResponse } from '@/shared/types/board';
import { Drawer, DrawerHeader } from './styled-components';
import { getAllBoards } from '@/shared/api/board';
import { UserAvatar } from '@/entities/user/ui/UserAvatar';
import { RootState } from '@/shared/store/store';

import styles from './BoardSideBar.module.css';

export const BoardSidebar: FC = () => {
	const { firstname, lastname, avatar } = useSelector(
		(state: RootState) => state.user
	);

	const [boards, setBoards] = useState<BoardResponse[]>([]);
	const [open, setOpen] = useState<boolean>(true);

	const { data } = useQuery({
		queryKey: ['boards'],
		queryFn: getAllBoards,
	});

	useEffect(() => {
		if (data) {
			if (!isApiError(data)) {
				setBoards(data);
			}
		}
	}, [data]);

	return (
		<Drawer variant='permanent' open={open}>
			<DrawerHeader>
				<IconButton onClick={() => setOpen((prev) => !prev)}>
					{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<Box className={styles.avatarWrapper}>
				<UserAvatar
					firstname={firstname}
					lastname={lastname}
					avatar={avatar}
				/>
				Рабочее пространство
			</Box>
			<Divider />
			<List>
				{boards?.map((board) => (
					<BoardSidebarItem key={board.id} open={open} {...board} />
				))}
			</List>
		</Drawer>
	);
};
