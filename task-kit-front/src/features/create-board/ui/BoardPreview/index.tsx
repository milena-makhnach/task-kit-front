import { Box } from '@mui/material';
import { FC } from 'react';

import styles from '../create-board-menu.module.css';

import createTaskIcon from '@/assets/icons/create-task.svg';

type BoardPreviewPropsType = {
	selectedPhoto: string | null;
	selectedColor: string | null;
};

export const BoardPreview: FC<BoardPreviewPropsType> = ({
	selectedPhoto,
	selectedColor,
}) => {
	return (
		<Box className={styles.preview}>
			<Box
				className={styles.previewContent}
				sx={{
					backgroundImage: `url(${
						selectedPhoto ? selectedPhoto : ''
					})`,
					background: selectedColor ? selectedColor : '',
				}}>
				<img src={createTaskIcon} alt='create task' />
			</Box>
		</Box>
	);
};
