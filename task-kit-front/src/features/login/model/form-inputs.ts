import { INPUT_TYPE } from '@/shared/types/general';

type FormInputsType = {
	name: LoginFormFields;
	type: INPUT_TYPE;
	placeholder: string;
	label: string;
};

type LoginFormFields = 'email' | 'password';

export const FORM_INPUTS: FormInputsType[] = [
	{ name: 'email', type: 'email', placeholder: 'Email', label: 'Email' },
	{
		name: 'password',
		type: 'password',
		placeholder: 'Пароль',
		label: 'Пароль',
	},
];
