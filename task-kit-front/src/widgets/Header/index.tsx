import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation } from '@tanstack/react-query';

import { Input } from '@/shared/ui/Input';
import { RootState } from '@/shared/store/store';
import { Logo } from '@/shared/ui/index';
import { UserAvatar } from '@/entities/user/ui/UserAvatar/index';

import styles from './header.module.css';
import { UserMenu } from '@/entities/user/ui/UserMenu';
import { invite } from '@/shared/api/auth';

export const Header: FC = () => {
	const { board_id } = useParams();

	const [anchorEl, setanchorEl] = useState<HTMLElement | null>(null);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');

	const { mutate } = useMutation({
		mutationFn: invite,
		mutationKey: ['invite'],
		onSuccess: () => {
			setOpenModal(false);
			setEmail('');
		},
	});

	const { isAuth, firstname, lastname, avatar, id } = useSelector(
		(state: RootState) => state.user
	);

	return (
		<Box className={styles.header}>
			<Logo />
			<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
				{isAuth && (
					<button
						className={styles.invite}
						onClick={() => setOpenModal(true)}>
						Пригласить друга
					</button>
				)}
				{isAuth && (
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
				)}
			</Box>
			<UserMenu anchorEl={anchorEl} setAnchorEl={setanchorEl} />

			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box
					sx={{
						position: 'absolute' as 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 450,
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 6,
						borderRadius: '8px',
					}}>
					<IconButton
						sx={{
							position: 'absolute',
							top: '5px',
							right: '5px',
						}}
						onClick={() => setOpenModal(false)}>
						<CloseIcon />
					</IconButton>
					<Typography
						id='modal-modal-title'
						fontWeight={500}
						textAlign='center'
						mb={2}>
						Пригласить друга по Email
					</Typography>
					<Box sx={{ display: 'flex', gap: '15px' }}>
						<Input
							value={email}
							placeholder='Введите email для приглашения'
							fullWidth
							onChange={(e) => setEmail(e.target.value)}
							sx={{ textOverflow: 'ellipsis' }}
						/>
						<button
							className={styles.submitBtn}
							onClick={() => {
								email &&
									mutate({
										board_id: board_id as string,
										user_id: id as number,
										email,
									});
							}}>
							Отправить
						</button>
					</Box>
				</Box>
			</Modal>
		</Box>
	);
};
