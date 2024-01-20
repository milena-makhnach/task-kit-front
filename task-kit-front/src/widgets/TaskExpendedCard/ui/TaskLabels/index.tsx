import { LabelType } from '@/shared/types/label';
import { LabelPopover } from '@/widgets/TaskPopovers/LabelPopover/LabelPopover';
import { Box, Button, Typography } from '@mui/material';
import { FC, useState } from 'react';

type TaskLabelsPropsType = {
	labels: LabelType[];
};

export const TaskLabels: FC<TaskLabelsPropsType> = ({ labels }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	if (labels.length <= 0) return null;

	return (
		<Box>
			<Typography sx={{ fontSize: '12px' }} fontWeight={500}>
				Метки
			</Typography>
			<Box
				sx={{
					display: 'flex',
					gap: '5px',
					flexWrap: 'wrap',
					marginTop: '5px',
				}}>
				{labels.map((item) => (
					<LabelPopover
						anchorEl={anchorEl}
						onClose={() => setAnchorEl(null)}>
						<Button
							key={item.id}
							sx={{
								background: item.color,
								textTransform: 'none',
								padding: '0 12px',
								minWidth: '48px',
								maxWidth: '100%',
								textOverflow: 'ellipsis',
								overflow: 'hidden',
								borderRadius: '3px',
								color: '#000',
								fontSize: '14px',
								'&:hover': {
									background: item.color,
									opacity: 0.7,
								},
							}}
							onClick={(e) => setAnchorEl(e.currentTarget)}>
							{item.name}
						</Button>
					</LabelPopover>
				))}
				<LabelPopover
					anchorEl={anchorEl}
					onClose={() => setAnchorEl(null)}>
					<Button
						sx={{
							width: '32px',
							height: '32px',
							borderRadius: '3px',
							background: 'var(--bg-base-btn)',
							color: '#000',
							'&:hover': {
								background: 'var(--bg-base-btn-hover)',
							},
							textTransform: 'none',
							fontSize: '14px',
						}}
						onClick={(e) => setAnchorEl(e.currentTarget)}>
						+
					</Button>
				</LabelPopover>
			</Box>
		</Box>
	);
};
