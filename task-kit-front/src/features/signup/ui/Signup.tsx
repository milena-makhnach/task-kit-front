import { FC, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Paper, Typography, Button, FormHelperText } from '@mui/material';
import { Input } from '@/shared/ui/index';
import { Link, useNavigate } from 'react-router-dom';

import { formDefaultValues } from '../model/form-default-values';
import { signupValidatorShema } from '../validators/signup-validator';
import { SignupFormValues } from '@/shared/types/signup-form-values';
import { useRegisterMutation } from '@/shared/api/auth';
import { useAppDispatch } from '@/shared/store/store';
import { setUserData } from '@/entities/user/slice/user-slice';
import { showQueryError } from '@/shared/utils/show-query-error';

import styles from './signup.module.css';

export const Signup: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [signup, { data, isError, isLoading, isSuccess, error }] =
		useRegisterMutation();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupFormValues>({
		defaultValues: formDefaultValues,
		resolver: yupResolver(signupValidatorShema),
	});

	const onSubmit: SubmitHandler<SignupFormValues> = (data) => {
		const { confirmPassword: _, ...userData } = data;

		signup(userData);
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
	}, [data, isSuccess]);

	return (
		<Box className={styles.signup}>
			<Paper className={styles.signupContent} elevation={3}>
				<Typography
					component='p'
					variant='h5'
					mb={4}
					sx={{ fontWeight: 600, textAlign: 'center' }}>
					Зарегистироваться
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box className={styles.signupInputs}>
						<Controller
							name='firstname'
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									placeholder='Имя'
									label='Имя'
									error={!!errors['firstname']}
									errorText={errors['firstname']?.message}
								/>
							)}
						/>
						<Controller
							name='lastname'
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									placeholder='Фамилия'
									label='Фамилия'
									error={!!errors['lastname']}
									errorText={errors['lastname']?.message}
								/>
							)}
						/>
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

						<Controller
							name='confirmPassword'
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									type='password'
									placeholder='Подтвердить пароль'
									label='Подтвердить пароль'
									error={!!errors['confirmPassword']}
									errorText={
										errors['confirmPassword']?.message
									}
								/>
							)}
						/>
					</Box>
					{isError && error && (
						<FormHelperText
							sx={{ fontWeight: 600 }}
							error={isError}>
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
						Создать аккаунт
					</Button>
				</form>
				<Box className={styles.textContainer}>
					<Typography
						component='p'
						variant='subtitle2'
						color='primary'
						textAlign='center'>
						Уже есть аккаунт?
					</Typography>
					<Link to={'/'} className={styles.signupLink}>
						Войти
					</Link>
				</Box>
			</Paper>
		</Box>
	);
};
