import { Box, IconButton, Menu, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import styles from './Popover.module.css';

type PopoverButtonType = {
	children: ReactNode;
	anchorElement: HTMLElement | null;
	popoverTitle: string;
	onClose: () => void;
};

export const Popover: FC<PopoverButtonType> = ({
	children,
	anchorElement,
	popoverTitle,
	onClose,
}) => {
	return (
		<Menu
			anchorEl={anchorElement}
			open={Boolean(anchorElement)}
			onClose={onClose}
			MenuListProps={{
				sx: {
					paddingTop: 0,
					minWidth: '300px',
					maxWidth: '350px',
				},
			}}
			sx={{ paddintTop: 0, borderRadius: '8px', minWidth: '300px' }}>
			<Box className={styles.popoverHeader}>
				<Typography
					className={styles.popoverTitle}
					sx={{
						lineHeight: '40px',
						fontWeight: 600,
						fontSize: '16px',
					}}>
					{popoverTitle}
				</Typography>
				<IconButton className={styles.popoverClose} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</Box>
			<Box className={styles.popoverContent}>{children}</Box>
		</Menu>
	);
};
