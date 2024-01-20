import { Box, Button } from '@mui/material';
import { FC, useState } from 'react';

import coverIcon from '@/assets/icons/window.svg';

import styles from './TaskCover.module.css';
import { CoverPopover } from '@/widgets/TaskPopovers/CoverPopover';

type TaskCoverPropsType = {
	bg_color: string;
};

export const TaskCover: FC<TaskCoverPropsType> = ({ bg_color }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	return (
		<Box sx={{ background: bg_color }} className={styles.cover}>
			<CoverPopover anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
				<Button
					className={styles.coverBtn}
					sx={{
						background: 'transparent',
						textTransform: 'none',
						color: '#000',
						fontSize: '14px',
						'&:hover': {
							background: 'var(--bg-base-btn-hover)',
						},
					}}
					onClick={(e) => setAnchorEl(e.currentTarget)}>
					<img src={coverIcon} alt='Cover button icon.' />
					Обложка
				</Button>
			</CoverPopover>
		</Box>
	);
};
