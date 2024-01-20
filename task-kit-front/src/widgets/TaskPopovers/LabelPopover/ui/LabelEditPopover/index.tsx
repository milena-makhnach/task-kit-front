import {
	Box,
	Button,
	Divider,
	IconButton,
	OutlinedInput,
	Typography,
} from '@mui/material';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Popover } from '@/shared/ui';
import { LABEL_COLORS } from './data';
import { LabelType } from '@/shared/types/label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLabel, updateLabel } from '@/shared/api/label';

type LabelEditPopoverPropsType = {
	label: LabelType;
};

export const LabelEditPopover: FC<LabelEditPopoverPropsType> = ({ label }) => {
	const queryClient = useQueryClient();

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [pickedLabel, setPickedLabel] = useState<LabelType | null>(null);
	const [labelName, setLabelName] = useState<string | null>(null);

	const { mutate: editLabel } = useMutation({
		mutationFn: updateLabel,
		mutationKey: ['label'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['board'] });
		},
	});

	const { mutate: removeLabel } = useMutation({
		mutationFn: deleteLabel,
		mutationKey: ['label'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['board'] });
		},
	});

	const handldeSelectLabel = (color: string) => {
		if (pickedLabel) {
			const newLabel = { ...pickedLabel };
			newLabel.color = color;
			setPickedLabel(newLabel);
		}
	};

	const handleUpdateLabel = () => {
		if (pickedLabel) {
			const { board_id, ...labelData } = pickedLabel;
			editLabel({ ...labelData, name: labelName });
			setAnchorEl(null);
		}
	};

	const handleDeleteLabel = () => {
		if (pickedLabel) {
			removeLabel(pickedLabel.id);
			setAnchorEl(null);
		}
	};

	useEffect(() => {
		if (label) {
			setPickedLabel(label);
			setLabelName(label.name);
		}
	}, [label]);

	return (
		<>
			<IconButton
				sx={{ width: '35px', height: '35px' }}
				onClick={(e) => setAnchorEl(e.currentTarget)}>
				<EditIcon sx={{ width: '25px', height: '25px' }} />
			</IconButton>
			<Popover
				popoverTitle='Изменение метки'
				anchorElement={anchorEl}
				onClose={() => setAnchorEl(null)}>
				<Box
					sx={{
						background: '#f7f8f9',
						padding: ' 35px',
						margin: '0 -12px',
					}}>
					<Box
						sx={{
							height: '32px',
							padding: '0 12px',
							borderRadius: '3px',
							fontSize: '14px',
							lineHeight: '32px',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							fontWeight: 500,
							background: pickedLabel?.color || '',
						}}>
						{labelName || ''}
					</Box>
				</Box>
				<Box sx={{ marginTop: '10px' }}>
					<Typography
						sx={{
							fontSize: '12px',
							marginBottom: '5px',
						}}
						fontWeight={500}>
						Название
					</Typography>
					<OutlinedInput
						sx={{
							height: '40px',
							'&.MuiInputBase-root': {
								height: '40px',
							},
						}}
						color='secondary'
						type='text'
						placeholder='Название метки'
						value={labelName || ''}
						onChange={(e) => setLabelName(e.target.value)}
						fullWidth
					/>
				</Box>
				<Box sx={{ marginTop: '10px' }}>
					<Typography
						sx={{ fontSize: '12px', marginBottom: '5px' }}
						fontWeight={500}>
						Цвет
					</Typography>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: 'repeat(5, 1fr)',
							gap: '5px',
						}}>
						{LABEL_COLORS.map((item) => (
							<Button
								key={item.id}
								onClick={() => handldeSelectLabel(item.color)}
								sx={{
									background: item.color,
									height: '35px',
									borderRadius: '3px',
									border:
										item.color === pickedLabel?.color
											? '2px solid #000'
											: 'none',
									'&:hover': {
										background: item.color,
										opacity: 0.7,
									},
								}}
							/>
						))}
					</Box>
				</Box>
				<Divider sx={{ margin: '20px 0' }} />
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						gap: '5px',
					}}>
					<Button
						sx={{
							textTransform: 'none',
							fontSize: '14px',
							fontWeight: 500,
							'&:hover': {
								backgroundColor: 'var(--base-theme-dark-clr)',
							},
						}}
						color='secondary'
						variant='contained'
						onClick={handleUpdateLabel}>
						Сохранить
					</Button>
					<Button
						sx={{
							textTransform: 'none',
							fontSize: '14px',
							fontWeight: 500,
						}}
						color='error'
						variant='contained'
						onClick={handleDeleteLabel}>
						Удалить
					</Button>
				</Box>
			</Popover>
		</>
	);
};
