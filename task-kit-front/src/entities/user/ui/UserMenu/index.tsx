import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Box, Divider, Menu, MenuItem, Typography } from '@mui/material';

import { useLogoutMutation } from '@/shared/api/auth';
import { logoutUser } from '@/entities/user/slice/user-slice';
import { UserAvatar } from '@/entities/user/ui/UserAvatar';
import { RootState, useAppDispatch } from '@/shared/store/store';
import styles from './user-menu.module.css';
import { Link, redirect, useNavigate } from 'react-router-dom';

type userMenuProps = {
	anchorEl: null | HTMLElement;
	setAnchorEl: (el: null | HTMLElement) => void;
};

export const UserMenu: FC<userMenuProps> = ({ anchorEl, setAnchorEl }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate()
	const [logout] = useLogoutMutation();

	const { firstname, lastname, email, avatar } = useSelector(
		(state: RootState) => state.user
	);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		await logout();
		dispatch(logoutUser());
		handleClose();
	};
	const handleToProfile = () => {
		setAnchorEl(null);
		navigate('/profile')
	};

	return (
		<Menu
			anchorEl={anchorEl}
			open={!!anchorEl}
			onClose={handleClose}
			MenuListProps={{
				'aria-labelledby': 'avatar',
			}}>
			<Box>
				<Typography
					className={styles.title}
					component='p'
					sx={{
						fontWeight: 700,
						fontSize: '11px',
						margin: '16px 0 8px',
					}}>
					Учетная запись
				</Typography>
				<Box className={styles.userInfo}>
					<UserAvatar
						firstname={firstname}
						lastname={lastname}
						avatar={avatar}
					/>
					<Box className={styles.userName}>
						<Typography>
							{firstname} {lastname}
						</Typography>
						<Typography>{email}</Typography>
					</Box>
				</Box>
			</Box>
			<Divider sx={{ marginBlock: '8px' }} />
			<Typography
				className={styles.teamKit}
				component='p'
				sx={{
					fontWeight: 700,
					fontSize: '11px',
					margin: '16px 0 8px',
				}}>
				Team Kit
			</Typography>
			<MenuItem
				sx={{
					padding: '8px 20px',
					fontSize: '14px',
				}}
				onClick={handleToProfile}>
				Профиль
			</MenuItem>
			<MenuItem
				sx={{
					padding: '8px 20px',
					fontSize: '14px',
				}}
				onClick={handleClose}>
					Настрйоки
			</MenuItem>
			<MenuItem
				sx={{
					padding: '8px 20px',
					fontSize: '14px',
				}}
				onClick={handleClose}>
				Выбор темы
			</MenuItem>
			<Divider sx={{ marginBlock: '8px' }} />
			<MenuItem
				sx={{
					padding: '8px 20px',
					fontSize: '14px',
				}}
				onClick={handleLogout}>
				Выйти
			</MenuItem>
		</Menu>
	);
};
