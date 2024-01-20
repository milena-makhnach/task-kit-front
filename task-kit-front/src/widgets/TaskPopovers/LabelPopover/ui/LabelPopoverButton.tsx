import { Button } from '@mui/material';
import { FC, useState } from 'react';

type LabelPopoverButtonType = {
	img: string;
	text: string;
	Item: any;
};
export const LabelPopoverButton: FC<LabelPopoverButtonType> = ({
	img,
	text,
	Item,
}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	return (
		<Item anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
			<Button
				sx={{
					background: 'var(--bg-base-btn)',
					color: '#000',
					textTransform: 'none',
					justifyContent: 'flex-start',
					width: '170px',
					fontSize: '14px',
					gap: '5px',
					'&:hover': {
						background: 'var(--bg-base-btn-hover)',
					},
				}}
				onClick={(e) => setAnchorEl(e.currentTarget)}>
				<img src={img} alt='Action button icon' />
				{text}
			</Button>
		</Item>
	);
};
