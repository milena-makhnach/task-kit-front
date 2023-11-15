import { UserAvatar } from '@/entities/user/ui/UserAvatar';
import { ListItem, ListItemText } from '@mui/material';
import { FC } from 'react';
// import DoneIcon from '@material-ui/icons';

type MembersPopoverItemProps = {
	name: string;
	lastname: string;
	avatar?: string;
	isSelected: boolean;
};

export const MembersPopoverItem: FC<MembersPopoverItemProps> = ({
	name = 'milena',
	lastname = 'makhnach',
	avatar = '',
	isSelected = true,
}) => {
	return (
		<ListItem>
			<UserAvatar firstname={name} lastname={lastname} avatar={avatar} />
			<ListItemText>
				{name} {lastname}
			</ListItemText>
			{/* {isSelected && <DoneIcon />} */}
		</ListItem>
	);
};
