import { getTask, updateTask } from '@/shared/api/task';
import { usePaletteColors } from '@/shared/hooks';
import { isApiError } from '@/shared/type-guards/query-error-guard';
import { BoardMenuColor, Popover } from '@/shared/ui';
import { Box, Button, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type CoverPopoverPropsType = {
	children: ReactNode;
	anchorEl: HTMLElement | null;
	onClose: () => void;
};

export const CoverPopover: FC<CoverPopoverPropsType> = ({
	children,
	anchorEl,
	onClose,
}) => {
	const { task_id, board_id } = useParams();
	const paletteColors = usePaletteColors();
	const queryClient = useQueryClient();

	const [bg, setBg] = useState<string>('');

	const { data, isSuccess } = useQuery({
		queryFn: getTask,
		queryKey: [
			'task',
			{ task_id: task_id as string, board_id: board_id as string },
		],
	});

	const { mutate } = useMutation({
		mutationFn: updateTask,
		mutationKey: ['task'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['task'],
			});
		},
	});

	const handleSelectBg = (bg: string) => {
		setBg(bg);
		mutate({ id: String(task_id), bg_color: bg });
	};

	const handleDeleteCover = () => {
		setBg('');
		mutate({ id: String(task_id), bg_color: null });
		onClose();
	};

	useEffect(() => {
		if (isSuccess && data) {
			if (!isApiError(data)) {
				data.bg_color && setBg(data.bg_color);
			}
		}
	}, [isSuccess, data]);

	return (
		<>
			{children}
			<Popover
				onClose={onClose}
				anchorElement={anchorEl}
				popoverTitle='Обложка'>
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
						marginBottom: '10px',
						padding: '10px 0',
					}}
					onClick={handleDeleteCover}>
					Убрать обложку
				</Button>

				<Box>
					<Typography
						sx={{ fontSize: '12px', marginBottom: '5px' }}
						fontWeight={500}>
						Цвета
					</Typography>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns:
								'repeat(auto-fill, minmax(50px, 1fr))',
							gap: '5px',
						}}>
						{paletteColors.map((item) => (
							<BoardMenuColor
								key={item}
								isSelected={bg === item}
								color={item}
								handleSelectBg={() => handleSelectBg(item)}
							/>
						))}
					</Box>
				</Box>
			</Popover>
		</>
	);
};
