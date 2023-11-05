import { Avatar } from '@mui/material';
import { ComponentProps, FC } from 'react';

import { stringAvatar } from '../../model/user-avatar-model';

import './user-avatar.css';

type userAvatarProps = ComponentProps<typeof Avatar> & {
	firstname: string;
	lastname: string;
	avatar: string;
};

export const UserAvatar: FC<userAvatarProps> = ({
	firstname,
	lastname,
	avatar,
	...restProps
}) => {
	return (
		<>
			{avatar ? (
				<Avatar
					src={avatar}
					alt={`${firstname} ${lastname}`}
					{...restProps}
				/>
			) : (
				<Avatar
					{...restProps}
					{...stringAvatar(`${firstname} ${lastname}`)}
				/>
			)}
		</>
	);
};
