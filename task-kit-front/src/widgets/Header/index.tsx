import { FC, useState } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import { RootState } from '@/shared/store/store';
import { Logo } from '@/shared/ui/index';
import { UserAvatar } from '@/entities/user/ui/UserAvatar/index';

import styles from './header.module.css';
import { UserMenu } from '@/entities/user/ui/UserMenu';

export const Header: FC = () => {
	const theme = useTheme();

	const [anchorEl, setanchorEl] = useState<HTMLElement | null>(null);

	const { isAuth, firstname, lastname, avatar } = useSelector(
		(state: RootState) => state.user
	);

	return (
		<Box
			sx={{ backgroundColor: theme.palette.primary.main }}
			className={styles.header}>
			<Logo />

				<IconButton
					id='avatar'
					onClick={(e) => setanchorEl(e.currentTarget)}>
					<UserAvatar
						firstname={firstname}
						lastname={lastname}
						avatar={avatar}
						style={{ width: '2rem', height: '2rem' }}
					/>
				</IconButton>
		
			<UserMenu anchorEl={anchorEl} setAnchorEl={setanchorEl} />
		</Box>
	);
};
