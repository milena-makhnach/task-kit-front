import styles from './FilePopover.module.css';
import Box from '@mui/material/Box/Box';
import { Button, Input, InputAdornment } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { useState, useCallback, ChangeEvent } from 'react';
import { useDropzone } from 'react-dropzone';

export const FilePopover = () => {
	const [value, setValue] = useState<File | null>(null);

	const onDrop = useCallback((acceptedFiles: Array<File>) => {
			console.log(acceptedFiles[0])
		setValue(acceptedFiles[0])
	  }, [])
	  
	const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;

		files && setValue(files[0]);
	};

	console.log(value)
	return (
		<Box className={styles.container}>
			<p>Прикрепить</p>
			<p>Прикрепите файл с компьютера</p>
			<p>
				Вы можете просто перетянуть и отпустить файлы с компьютера, что бы
				выгрузить их.
			</p>

			<input style={{ display: 'none' }}  />
			
			<label className={styles.fileInput} htmlFor='file' {...getRootProps()}>
				<input type='file' id='file' {...getInputProps()} onClick={e => handleChange} />
				{isDragActive ? (
					<p>Перенесите файл сюда</p>
				) : (
					<p>{value ? 'Файл успешно добавлен' : 'Выбрать файл'}</p>
				)}
			</label>
		</Box>
	);
};
