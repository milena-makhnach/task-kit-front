import { TextField, FormHelperText } from '@mui/material';

import { ComponentProps, FC } from 'react';

type InputProps = ComponentProps<typeof TextField> & {
	errorText?: string;
};

export const Input: FC<InputProps> = ({ errorText, ...restProps }) => {
	return (
		<div>
			<TextField {...restProps} fullWidth autoComplete='off' />
			<FormHelperText error={restProps.error}>
				{errorText && restProps.error ? errorText : ' '}
			</FormHelperText>
		</div>
	);
};
