import styles from './FilePopover.module.css';
import Box from '@mui/material/Box/Box';
import { Button, InputAdornment } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { useState } from 'react';
export const FilePopover = () => {
	const [value, setValue] = useState<File | null>(null);

	const handleChange = (newValue: File | null) => {
		setValue(newValue);
	};
	return (
		<Box className={styles.container}>
			<p>Прикрепить</p>
			<p>Прикрепите файл с компьютера</p>
			<p>
				Вы можете просто перетянуть и отпустить файлы с компьютера, что бы
				выгрузить их.
			</p>
			<MuiFileInput
				InputProps={{
					startAdornment: (
						<InputAdornment position='end'>
							<></>
						</InputAdornment>
					),
				}}
				style={{textAlign: 'center'}}
                content='hello suka'
                
				color='warning'
				placeholder='Выбрать файл'
				value={value}
				onChange={handleChange}
			/>
		</Box>
	);
};
