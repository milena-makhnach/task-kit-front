import { AllBoardPhotos } from '@/features/allBoardPhotos/ui/AllBoardPhotos';
import { Popover } from '@/shared/ui';
import { Button } from '@mui/material';
import { FC, useState } from 'react';

export const ExpendedBoardPhotos: FC = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	return (
		<>
			<Button
				sx={{
					backgroundColor: 'var(--bg-base-btn)',
					color: 'var(--clr-main)',
					fontSize: '14px',
					fontWeight: 600,
					textTransform: 'capitalize',
					display: 'flex',
					marginLeft: 'auto',
				}}
				onClick={(e) => setAnchorEl(e.currentTarget)}>
				Подробнее
			</Button>
			<Popover
				anchorElement={anchorEl}
				popoverTitle='Фотографии'
				onClose={() => setAnchorEl(null)}>
				<AllBoardPhotos />
			</Popover>
		</>
	);
};
