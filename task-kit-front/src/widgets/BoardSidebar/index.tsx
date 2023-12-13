import { FC, useEffect, useState } from 'react';
import {
	ListItem,
	ListItemButton,
	ListItemText,
	IconButton,
	List,
	Divider,
	Box,
} from '@mui/material';
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import userAvatar from '../../assets/icons/user.svg';

import styles from './BoardSideBar.module.css';
import { getAllBoards } from '@/shared/api/board';
import { BoardResponse } from '@/shared/types/board';
import { isApiError } from '@/shared/type-guards/query-error-guard';

const openedMixin = (theme: Theme): CSSObject => ({
	width: 240,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: 240,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export const BoardSidebar: FC = () => {
	const [boards, setBoards] = useState<BoardResponse[]>([]);
	const [open, setOpen] = useState(true);

	const theme = useTheme();

	const { data } = useQuery({
		queryKey: ['boards'],
		queryFn: getAllBoards,
	});

	const toggleDrawer = () => {
		setOpen((prev) => !prev);
	};

	useEffect(() => {
		if (data) {
			if (!isApiError(data)) {
				setBoards(data);
			}
		}
	}, [data]);

	return (
		<Drawer
			variant='permanent'
			open={open}
			sx={{
				transform: 'translateY(1px)',
				'& > .MuiPaper-root': {
					backgroundColor: theme.palette.primary.light,
				},
			}}>
			<DrawerHeader>
				<IconButton onClick={toggleDrawer}>
					{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<Box
				sx={{
					fontSize: '16px',
					marginBlock: '6px',
					display: 'flex',
					justifyContent: 'start',
					alignItems: 'center',
					gap: '4px',
				}}>
				<img
					style={{
						width: '30px',
						height: '30px',
						marginInline: open ? '0px' : '16px',
						transition: 'all .3s linear',
					}}
					alt=''
					src={userAvatar}
				/>
				Рабочее пространство
			</Box>
			<Divider />
			<List>
				{boards.map((board) => (
					<ListItem key={board.id} disablePadding>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}>
							<Link
								to={`/board/${board.id}`}
								className={styles.sidebarItem}>
								<Box
									sx={{
										backgroundImage: `url(${
											board.photo ? board.photo.file : ''
										})`,
										background: board.bg_color
											? board.bg_color
											: '',
										width: '20px',
										height: '20px',
										flexShrink: 0,
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',
									}}
								/>
								<ListItemText>{board.name}</ListItemText>
							</Link>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};
