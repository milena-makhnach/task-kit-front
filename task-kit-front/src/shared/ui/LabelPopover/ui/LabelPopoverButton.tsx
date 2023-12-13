import { Button, Popover } from '@mui/material';
import { FC, ReactNode, useRef, useState } from 'react';

type LabelPopoverButtonType = {
	img: string;
	text: string;
	item: ReactNode;
};
export const LabelPopoverButton: FC<LabelPopoverButtonType> = ({
	img,
	text,
	item,
}) => {
	const refik = useRef<HTMLDivElement>(null);
	const [anchorEl, setAnchorEl] = useState(null);
	function handleClick() {
		if (refik.current !== null) {
			// @ts-ignore
			setAnchorEl(refik.current);
		}
	}

	function handleClose() {
		setAnchorEl(null);
	}
	const open = Boolean(anchorEl);
	return (
		<div ref={refik} style={{ width: '100%' }}>
			<Button
				sx={{
					width: '100%',
					display: 'flex',
					gap: '10px',
					justifyContent: 'flex-start',
					color: '#ffff',
				}}
				aria-describedby='123'
				variant='contained'
				onClick={handleClick}>
				{img && (
					<img
						style={{
							width: '20px',
							height: '20px',
							color: '#ffff',
						}}
						alt=''
						src={img}></img>
				)}
				{text}
			</Button>

			<Popover
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'center',
					horizontal: 'left',
				}}>
				{item}
			</Popover>
		</div>
	);
};
