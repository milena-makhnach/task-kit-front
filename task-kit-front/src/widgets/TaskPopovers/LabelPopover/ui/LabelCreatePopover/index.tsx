import { Box, Button, Divider, OutlinedInput, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { Popover } from '@/shared/ui';
import { LABEL_COLORS } from '../LabelEditPopover/data';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLabel } from '@/shared/api/label';

export const LabelCreatePopover: FC = () => {
	const { board_id } = useParams();
	const queryClient = useQueryClient();

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [pickedLabel, setPickedLabel] = useState<string>(
		LABEL_COLORS[0].color
	);
	const [labelName, setLabelName] = useState<string>('');

	const { mutate: createNewLabel } = useMutation({
		mutationFn: createLabel,
		mutationKey: ['label'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['board'] });
		},
	});

	const handldeSelectLabel = (color: string) => {
		setPickedLabel(color);
	};

	const handleCreateLabel = () => {
		if (board_id) {
			createNewLabel({
				name: labelName,
				color: pickedLabel,
				board_id: +board_id,
			});

			setAnchorEl(null);
		}
	};

	return (
		<>
			<Button
				sx={{
					width: '100%',
					background: 'var(--bg-base-btn)',
					color: '#000',
					'&:hover': {
						background: 'var(--bg-base-btn-hover)',
					},
					textTransform: 'none',
					fontSize: '14px',
					marginTop: '10px',
					padding: '10px 0',
				}}
				onClick={(e) => setAnchorEl(e.currentTarget)}>
				Создать новую метку
			</Button>
			<Popover
				popoverTitle='Создание метки'
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
							background: pickedLabel || '',
						}}>
						{labelName}
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
						value={labelName}
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
										item.color === pickedLabel
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
				<Box>
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
						onClick={handleCreateLabel}>
						Сохранить
					</Button>
				</Box>
			</Popover>
		</>
	);
};
