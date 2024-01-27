import { FC } from 'react';
import styles from './Chip.module.css';
import { Box } from '@mui/material';

type ChipType = {
	img: string;
	text: string;
};

export const Chip: FC<ChipType> = ({ img, text }) => {
	return (
		<Box className={styles.chip}>
			{img && <img alt='' src={img} />}
			<p>{text}</p>
		</Box>
	);
};
