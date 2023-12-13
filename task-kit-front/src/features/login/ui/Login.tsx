import { FC, useEffect, useState } from 'react';
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

import styles from './login.module.css';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/shared/api/auth';
import { isApiError } from '@/shared/type-guards/query-error-guard';
import { FORM_INPUTS } from '../model/form-inputs';

export const Login: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [error, setError] = useState<string | null>(null);

	const {
		mutate,
		data: user,
		isSuccess,
		isPending,
	} = useMutation({
		mutationFn: login,
		mutationKey: ['signup'],
	});

	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isDirty, isSubmitting, isSubmitted },
	} = useForm<LoginFormValues>({
		defaultValues: formDefaultValues,
		mode: 'onTouched',
		resolver: yupResolver(loginalidatorShema),
	});

	const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
		mutate(data);
	};

	useEffect(() => {
		if (isSuccess && user) {
			if (!isApiError(user)) {
				const { first_name, last_name, ...restData } = user;
				dispatch(
					setUserData({
						...restData,
						firstname: first_name,
						lastname: last_name,
					})
				);
				navigate('/');
				setError(null);
				return;
			}

			setError(user.message);
		}
	}, [user, isSuccess, navigate, dispatch]);

	return (
		<Box className={styles.login}>
			<Paper className={styles.loginContent} elevation={3}>
				<Typography
					component='p'
					variant='h6'
					mb={2}
					sx={{ fontWeight: 600, textAlign: 'center' }}>
					Войти
				</Typography>
				<form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
					<Box className={styles.loginInputs}>
						{FORM_INPUTS.map((item) => (
							<Controller
								name={item.name}
								control={control}
								render={({ field }) => (
									<Input
										{...item}
										{...field}
										placeholder={item.placeholder}
										label={item.label}
										type={item.type}
										error={!!errors[item.name]}
										errorText={errors[item.name]?.message}
									/>
								)}
							/>
						))}
					</Box>

					<FormHelperText error={!!error}>
						{error ? error : ' '}
					</FormHelperText>

					<Button
						variant='contained'
						sx={{
							marginBlock: '10px',
							fontWeight: 600,
							height: '50px',
						}}
						type='submit'
						disabled={
							(isDirty && !isValid) ||
							isSubmitting ||
							isPending ||
							(!isValid && isSubmitted)
						}
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
					<Link to={'/sign-up'} className={styles.signupLink}>
						Зарегистрироваться
					</Link>
				</Box>
			</Paper>
		</Box>
	);
};
