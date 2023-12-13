import { FC, useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Paper, Typography, Button, FormHelperText } from '@mui/material';
import { Input } from '@/shared/ui/index';
import { Link, useNavigate } from 'react-router-dom';

import { formDefaultValues } from '../model/form-default-values';
import { signupValidatorShema } from '../validators/signup-validator';
import { SignupFormValues } from '@/shared/types/signup-form-values';
import { useAppDispatch } from '@/shared/store/store';
import { setUserData } from '@/entities/user/slice/user-slice';
import { register } from '@/shared/api/auth';

import styles from './signup.module.css';
import { useMutation } from '@tanstack/react-query';
import { isApiError } from '@/shared/type-guards/query-error-guard';
import { FORM_INPUTS } from '../model/form-inputs';

export const Signup: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [error, setError] = useState<string | null>(null);

	const { mutate, data, isSuccess, isPending } = useMutation({
		mutationFn: register,
		mutationKey: ['signup'],
	});

	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isDirty, isSubmitting, isSubmitted },
	} = useForm<SignupFormValues>({
		defaultValues: formDefaultValues,
		mode: 'onTouched',
		resolver: yupResolver(signupValidatorShema),
	});

	const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
		const { confirmPassword: _, ...userData } = data;

		mutate(userData);
	};

	useEffect(() => {
		if (isSuccess && data) {
			if (!isApiError(data)) {
				const { first_name, last_name, ...restData } = data;
				dispatch(
					setUserData({
						...restData,
						firstname: first_name,
						lastname: last_name,
					})
				);

				navigate('/');
				return;
			}

			setError(data.message);
		}
	}, [data, isSuccess]);

	return (
		<Box className={styles.signup}>
			<Paper className={styles.signupContent} elevation={3}>
				<Typography
					component='p'
					variant='h6'
					mb={2}
					sx={{ fontWeight: 600, textAlign: 'center' }}>
					Зарегистироваться
				</Typography>
				<form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
					<Box className={styles.signupInputs}>
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
					<Link to={'/login'} className={styles.signupLink}>
						Войти
					</Link>
				</Box>
			</Paper>
		</Box>
	);
};
