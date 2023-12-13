import { ChangeEvent, FC, useState } from 'react';
import styles from './profile-page.module.css';
import Box from '@mui/material/Box/Box';
import { Button, Input, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../shared/store/store';
import { UserAvatar } from '../../entities/user/ui/UserAvatar';
import lopa from '@/assets/icons/search.svg';
import { useMutation } from '@tanstack/react-query';
import { updateUser } from '@/shared/api/auth';

export const ProfilePage: FC = () => {
	const { firstname, lastname, email, avatar } = useSelector(
		(state: RootState) => state.user
	);

	const [isResetOpen, setIsResetOpen] = useState(false);
	const [firstName, setFirstName] = useState<string>(firstname || '');
	const [lastName, setLastName] = useState<string>(lastname || '');
	const [changeEmail, setEmail] = useState<string>(email || '');
	const [password, setPassword] = useState<string>('password');
	const [newAvatar, setNewAvatar] = useState<File | null>(null);

	const { mutate } = useMutation({
		mutationFn: updateUser,
		mutationKey: ['user'],
	});

	const handleUpdateUser = () => {
		setIsResetOpen(!isResetOpen);
		isResetOpen &&
			mutate({
				first_name: firstName,
				last_name: lastName,
				email: changeEmail,
			});
	};

	const handleReset = () => {
		setFirstName('');
		setLastName('');
		setEmail('');
		setPassword('');
		setIsResetOpen(false);
	};
	console.log(newAvatar);
	const handleSetImage = (event: ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;
		files && setNewAvatar(files[0]);
	};

	return (
		<Box className={styles.page}>
			<Box className={styles.card}>
				<Box className={styles.userInfoContainer}>
					<Box className={styles.avatarContainer}>
						<input
							onChange={handleSetImage}
							accept='image/png, image/gif, image/jpeg'
							type='file'
							name=''
							id='ava'
						/>
						<label htmlFor='ava' className={styles.avaLabel}>
							<img alt='' src={lopa}></img>
						</label>
						<UserAvatar
							className={styles.ava}
							firstname={firstname}
							lastname={lastname}
							avatar={avatar}
						/>
					</Box>

					<Typography
						fontSize={24}
						fontWeight={600}
						sx={{ textTransform: 'capitalize' }}>
						Welcome, {firstname}
					</Typography>
				</Box>
				<Box className={styles.devider} />
				<Box className={styles.form}>
					<Input
						placeholder='First Name'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						disabled={!isResetOpen}
					/>
					<Input
						value={lastName}
						placeholder='First Name'
						onChange={(e) => setLastName(e.target.value)}
						disabled={!isResetOpen}
					/>
					<Input
						type='email'
						value={changeEmail}
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
						disabled={!isResetOpen}
					/>
					<Input
						type='password'
						value={password}
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
						disabled={!isResetOpen}
					/>
					<Button variant='contained' onClick={handleUpdateUser}>
						{isResetOpen ? 'save' : 'Update profile'}
					</Button>
					<Button
						variant='outlined'
						onClick={handleReset}
						sx={{ color: '#ffff' }}
						disabled={!isResetOpen}>
						Reset
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
