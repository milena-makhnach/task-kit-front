import { Box } from '@mui/material';
import { FC } from 'react';
import CheckIcon from '@mui/icons-material/Check';

import styles from './BoardMenuColor.module.css';

type BoardMenuColorPropsType = {
	color: string;
	isSelected: boolean;
	handleSelectBg: () => void;
};

export const BoardMenuColor: FC<BoardMenuColorPropsType> = ({
	color,
	isSelected,
	handleSelectBg,
}) => {
	return (
		<Box
			className={styles.colorPicker}
			key={color}
			onClick={handleSelectBg}>
			{isSelected && (
				<Box className={styles.selected}>
					<CheckIcon sx={{ width: 20 }} />
				</Box>
			)}
			<Box className={styles.color} sx={{ backgroundColor: color }}></Box>
		</Box>
	);
};
