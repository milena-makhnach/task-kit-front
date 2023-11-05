import { LoginFormValues } from '@/shared/types/login-form-values';
import * as Yup from 'yup';

export const loginalidatorShema: Yup.ObjectSchema<LoginFormValues> = Yup.object(
	{
		email: Yup.string().required('Обязательное поле'),
		password: Yup.string().required('Обязательное поле'),
	}
);
