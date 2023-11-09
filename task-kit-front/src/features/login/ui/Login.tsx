import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/shared/ui/index';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Paper, Typography, Button, FormHelperText } from '@mui/material';
import { setUserData } from '@/entities/user/slice/user-slice';

import { LoginFormValues } from '@/shared/types/login-form-values';
import { formDefaultValues } from '../model/form-default-values';
import { loginalidatorShema } from '../validators/login-validator';
import { useAppDispatch } from '@/shared/store/store';
import { useLoginMutation } from '@/shared/api/auth';
import { showQueryError } from '@/shared/utils/show-query-error';

import styles from './login.module.css';

export const Login: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [login, { data, isError, isLoading, isSuccess, error }] =
		useLoginMutation();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		defaultValues: formDefaultValues,
		resolver: yupResolver(loginalidatorShema),
	});

	const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
		login(data);
	};

	useEffect(() => {
		if (isSuccess && data) {
			const { first_name, last_name, ...restData } = data;
			dispatch(
				setUserData({
					...restData,
					firstname: first_name,
					lastname: last_name,
				})
			);
			navigate('/home');
		}
	}, [data, isSuccess, navigate, dispatch]);

	return (
		<Box className={styles.login}>
			<Paper className={styles.loginContent} elevation={3}>
				<Typography
					component='p'
					variant='h5'
					mb={4}
					sx={{ fontWeight: 600, textAlign: 'center' }}>
					Войти
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box className={styles.loginInputs}>
						<Controller
							name='email'
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									placeholder='Email'
									label='Email'
									type='email'
									error={!!errors['email']}
									errorText={errors['email']?.message}
								/>
							)}
						/>
						<Controller
							name='password'
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									placeholder='Пароль'
									label='Пароль'
									type='password'
									error={!!errors['password']}
									errorText={errors['password']?.message}
								/>
							)}
						/>
					</Box>
					{isError && error && (
						<FormHelperText
							error={isError}
							sx={{ fontWeight: 600 }}>
							{showQueryError(error)}
						</FormHelperText>
					)}
					<Button
						variant='contained'
						sx={{
							marginBlock: '20px',
							fontWeight: 600,
							height: '50px',
						}}
						type='submit'
						disabled={!!Object.keys(errors).length || isLoading}
						fullWidth>
						Войти
					</Button>
				</form>
				<Box className={styles.textContainer}>
					<Typography
						component='p'
						variant='subtitle2'
						color='primary'
						textAlign='center'>
						Еще нет аккаунта?
					</Typography>
					<Link to={'/signup'} className={styles.signupLink}>
						Зарегистрироваться
					</Link>
				</Box>
			</Paper>
		</Box>
	);
};
