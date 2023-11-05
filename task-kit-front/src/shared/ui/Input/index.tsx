import { TextField, FormHelperText } from '@mui/material';

import { ComponentProps, FC } from 'react';

type InputProps = ComponentProps<typeof TextField> & {
	errorText?: string;
};

export const Input: FC<InputProps> = ({ errorText, ...restProps }) => {
	return (
		<div>
			<TextField {...restProps} fullWidth />
			{errorText && restProps.error && (
				<FormHelperText
					error={restProps.error}
					sx={{ fontWeight: 600 }}>
					{errorText}
				</FormHelperText>
			)}
		</div>
	);
};
