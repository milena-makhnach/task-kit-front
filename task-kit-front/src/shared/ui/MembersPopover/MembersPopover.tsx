import { useState } from 'react';
import { Button } from '@mui/material';
import styles from './MembersPopover.module.css';
import Box from '@mui/material/Box/Box';

export const MembersPopover = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Box className={styles.container}>
			<p>Участники</p>
			<input type='text' />
			<Box>
				<p>Участники доски</p>
			</Box>

			<Box>
				{isOpen ? (
					<p>Участники рабочего пространства</p>
				) : (
					<Button sx={{fontSize: '14px', maxWidth: '300px'}} onClick={() => setIsOpen(true)} variant='contained'>
						Показать других участников рабочего пространства
					</Button>
				)}
			</Box>
		</Box>
	);
};
