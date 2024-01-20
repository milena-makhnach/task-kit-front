import { Box, Button, Typography } from '@mui/material';
import { FC, useState } from 'react';

import styles from './TaskAttach.module.css';

import attachIcon from '@/assets/icons/attach.svg';
import { DocumentType } from '@/shared/types/document';
import { UploadedFile } from '@/widgets/UploadedFile';
import { FilePopover } from '@/widgets/TaskPopovers/FilePopover/FilePopover';

type TaskAttachPropsType = {
	files: DocumentType[];
};

export const TaskAttach: FC<TaskAttachPropsType> = ({ files }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	return (
		<Box className={styles.attach}>
			<Box className={styles.attachHeader}>
				<Box>
					<Box className={styles.iconWrapper}>
						<img src={attachIcon} alt='Task attachment icon.' />
					</Box>
					<Typography
						fontWeight={500}
						mb={1}
						sx={{ fontSize: '14px' }}>
						Вложения
					</Typography>
				</Box>
				<FilePopover
					anchorEl={anchorEl}
					onClose={() => setAnchorEl(null)}>
					<Button
						sx={{
							background: 'var(--bg-base-btn)',
							color: '#000',
							'&:hover': {
								background: 'var(--bg-base-btn-hover)',
							},
							textTransform: 'none',
							fontSize: '14px',
							marginBottom: '10px',
							padding: '10px 15px',
						}}
						onClick={(e) => setAnchorEl(e.currentTarget)}>
						Добавить
					</Button>
				</FilePopover>
			</Box>

			<Box className={styles.files}>
				{files.map((file) => (
					<UploadedFile
						key={file.id}
						id={file.id}
						createAt={file.created_at}
						fileName={file.name}
						filePath={file.file}
					/>
				))}
			</Box>
		</Box>
	);
};
