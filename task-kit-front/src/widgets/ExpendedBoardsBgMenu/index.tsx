import { Button, Divider } from '@mui/material';
import { FC, useState } from 'react';
import { ExpendedBoardBgColors } from './ui/ExpendedBoardBgColors';
import { Popover } from '@/shared/ui';
import { ExpendedBoardBgPhotos } from './ui/ExpendedBoardBgPhotos';
import { ExpendedBoardPhotos } from './ui/ExpendedBoardPhotos';

export const ExpendedBoardBgMenu: FC = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	return (
		<>
			<Button
				onClick={(e) => setAnchorEl(e.currentTarget)}
				sx={{
					backgroundColor: 'var(--bg-base-btn)',
					color: 'var(--clr-main)',
				}}>
				...
			</Button>
			<Popover
				onClose={() => setAnchorEl(null)}
				anchorElement={anchorEl}
				popoverTitle='Фон доски'>
				<ExpendedBoardPhotos />
				<ExpendedBoardBgPhotos />
				<Divider sx={{ marginBlock: '10px' }} />
				<ExpendedBoardBgColors />
			</Popover>
		</>
	);
};
