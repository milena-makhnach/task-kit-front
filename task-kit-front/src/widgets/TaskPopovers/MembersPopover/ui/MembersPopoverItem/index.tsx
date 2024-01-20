import { UserAvatar } from '@/entities/user/ui/UserAvatar';
import { ListItem, ListItemText, ListItemButton } from '@mui/material';
import { FC } from 'react';
import DoneIcon from '@mui/icons-material/Done';

type MembersPopoverItemProps = {
	name: string;
	lastname: string;
	avatar?: string;
	isSelected: boolean;
};

export const MembersPopoverItem: FC<MembersPopoverItemProps> = ({
	name,
	lastname,
	avatar,
	isSelected = true,
}) => {
	return (
		<ListItem disablePadding>
			<ListItemButton
				selected={isSelected}
				sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
				<UserAvatar
					firstname={name}
					lastname={lastname}
					avatar={avatar || ''}
				/>
				<ListItemText sx={{ textTransform: 'capitalize' }}>
					{name} {lastname}
				</ListItemText>
				{isSelected && <DoneIcon />}
			</ListItemButton>
		</ListItem>
	);
};
