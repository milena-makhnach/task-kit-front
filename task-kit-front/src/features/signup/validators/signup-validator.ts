import { SignupFormValues } from '@/shared/types/signup-form-values';
import * as Yup from 'yup';

export const signupValidatorShema: Yup.ObjectSchema<SignupFormValues> =
	Yup.object({
		firstname: Yup.string().required('Обязательное поле'),
		lastname: Yup.string().required('Обязательное поле'),
		email: Yup.string()
			.email('Невалидный email')
			.required('Обязательное поле'),
		password: Yup.string()
			.min(8, 'Минимум 8 символов')
			.required('Обязательное поле'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password')], 'Пароль не совпадает')
			.required('Обязательное поле'),
	});
