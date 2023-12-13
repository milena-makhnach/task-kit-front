import { INPUT_TYPE } from '@/shared/types/general';

type FormInputsType = {
	name: SignupFormFields;
	type: INPUT_TYPE;
	placeholder: string;
	label: string;
};

type SignupFormFields =
	| 'firstname'
	| 'lastname'
	| 'email'
	| 'password'
	| 'confirmPassword';

export const FORM_INPUTS: FormInputsType[] = [
	{ name: 'firstname', type: 'text', placeholder: 'Имя', label: 'Имя' },
	{
		name: 'lastname',
		type: 'text',
		placeholder: 'Фамилия',
		label: 'Фамилия',
	},
	{ name: 'email', type: 'email', placeholder: 'Email', label: 'Email' },
	{
		name: 'password',
		type: 'password',
		placeholder: 'Пароль',
		label: 'Пароль',
	},
	{
		name: 'confirmPassword',
		type: 'password',
		placeholder: 'Подтвердить пароль',
		label: 'Подтвердить пароль',
	},
];
