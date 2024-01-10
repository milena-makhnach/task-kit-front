import { usePaletteColors } from '@/shared/hooks';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';

import styles from './ExpendedBoardBgColors.module.css';
import { BoardMenuColor } from '@/shared/ui';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/shared/store/store';
import { createBoardActions } from '@/features/create-board/slice/selectBgSlice';

export const ExpendedBoardBgColors: FC = () => {
	const dispatch = useAppDispatch();
	const { selectedColor } = useSelector(
		(state: RootState) => state.createBoard
	);

	const themePalettes = usePaletteColors();

	const handleSelectColor = (color: string) => {
		dispatch(createBoardActions.setBoardColor(color));
	};

	return (
		<Box>
			<Typography
				component='p'
				sx={{
					fontSize: '14px',
					fontWeight: 600,
					marginBottom: '8px',
				}}>
				Цвета
			</Typography>
			<Box className={styles.colors}>
				{themePalettes.map((item) => (
					<BoardMenuColor
						key={item}
						color={item}
						isSelected={Boolean(
							selectedColor && selectedColor === item
						)}
						handleSelectBg={() => handleSelectColor(item)}
					/>
				))}
			</Box>
		</Box>
	);
};
