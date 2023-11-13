import { FC, useState } from 'react';
import {
	ListItem,
	ListItemButton,
	ListItemText,
	IconButton,
	List,
	Divider,
	Box,
} from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import { api } from '@/shared/api/base-query';
import { BoardResponse } from '@/shared/types/board';
import { useQuery } from '@tanstack/react-query';

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

const getAllBoards = async () => {
	const { data } = await api.get('/board/');

	return data;
};

export const BoardSidebar: FC = () => {
	const [open, setOpen] = useState(false);

	const { data } = useQuery<BoardResponse[]>({
		queryKey: ['boards'],
		queryFn: getAllBoards,
	});

	const toggleDrawer = () => {
		setOpen((prev) => !prev);
	};

	return (
		<Drawer variant='permanent' open={open}>
			<DrawerHeader>
				<IconButton onClick={toggleDrawer}>
					{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<Box>Рабочее пространство</Box>
			<Divider />
			<List>
				{data?.map((board) => (
					<ListItem key={board.id} disablePadding>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}>
							<Link to={`/board/${board.id}`}>
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
