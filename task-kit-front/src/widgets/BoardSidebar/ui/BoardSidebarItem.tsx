import { BoardResponse } from '@/shared/types/board';
import { Box, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './BoardSidebarItem.module.css';
import { CanvasImage } from '@/shared/ui/CanvasImage';
import { useAppDispatch } from '@/shared/store/store';
import { setTheme } from '@/shared/slices/theme';
import { themePalette } from '@/shared/theme';
import { findThemeToUse } from '@/shared/utils/find-theme-palette';

type BoardSidebarItemPropType = BoardResponse & {
	open: boolean;
};

export const BoardSidebarItem: FC<BoardSidebarItemPropType> = ({
	open,
	...board
}) => {
	const dispatch = useAppDispatch();

	return (
		<CanvasImage
			imgSrc={board.photo?.file || ''}
			getPalette={(palette) => {
				if (board.photo) {
					dispatch(setTheme(palette));
				} else if (board.bg_color) {
					const theme = findThemeToUse(themePalette, board.bg_color);
					dispatch(setTheme(theme));
				}
			}}>
			<Link to={`/board/${board.id}`}>
				<ListItem key={board.id} disablePadding>
					<ListItemButton className={styles.sidebarItem}>
						<Box
							className={styles.boardPreview}
							sx={{
								backgroundImage: `url(${
									board.photo ? board.photo.file : ''
								})`,
								background: board.bg_color
									? board.bg_color
									: '',
							}}
						/>
						<ListItemText>{board.name}</ListItemText>
					</ListItemButton>
				</ListItem>
			</Link>
		</CanvasImage>
	);
};
