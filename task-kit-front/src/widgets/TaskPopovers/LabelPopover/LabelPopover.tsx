import { FC, ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OutlinedInput, Typography } from '@mui/material';
import Box from '@mui/material/Box/Box';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LabelPopoverItem } from './ui/LabelPopoverItem';
import { Popover } from '@/shared/ui';
import { LabelType } from '@/shared/types/label';
import { getBoard } from '@/shared/api/board';
import { isApiError } from '@/shared/type-guards/query-error-guard';
import { getTask } from '@/shared/api/task';
import { createTaskLabel, removeTaskLabel } from '@/shared/api/label';
import { LabelCreatePopover } from './ui/LabelCreatePopover';

type LabelPopoverPropsType = {
	children: ReactNode;
	anchorEl: HTMLElement | null;
	onClose: () => void;
};

export const LabelPopover: FC<LabelPopoverPropsType> = ({
	children,
	anchorEl,
	onClose,
}) => {
	const { board_id, task_id } = useParams();
	const queryClient = useQueryClient();

	const [labels, setLabels] = useState<
		Array<LabelType & { isAdded: boolean }>
	>([]);

	const { data } = useQuery({
		queryFn: getBoard,
		queryKey: ['board', { board_id: board_id as string }],
	});

	const { data: taskData } = useQuery({
		queryFn: getTask,
		queryKey: [
			'task',
			{ board_id: board_id as string, task_id: task_id as string },
		],
	});

	const { mutate: delTaskLabel } = useMutation({
		mutationFn: removeTaskLabel,
		mutationKey: ['task'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['task'] });
		},
	});

	const { mutate: setTaskLabel } = useMutation({
		mutationFn: createTaskLabel,
		mutationKey: ['task'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['task'] });
		},
	});

	const handleUpdateLabel = (id: number, isAdded: boolean) => {
		if (task_id) {
			if (!isAdded) {
				setTaskLabel({ label_id: id, task_id: +task_id });
			} else {
				delTaskLabel({ label_id: id, task_id: +task_id });
			}
		}
	};

	useEffect(() => {
		if (data && taskData) {
			if (!isApiError(data) && !isApiError(taskData)) {
				const labels = data.labels.map((label) => ({
					...label,
					isAdded: !!taskData.labels.find(
						(item) => label.id === item.id
					),
				}));

				setLabels(labels);
			}
		}
	}, [data, taskData]);

	return (
		<>
			{children}
			<Popover
				anchorElement={anchorEl}
				onClose={onClose}
				popoverTitle='метки'>
				<Box>
					<Typography
						sx={{ fontSize: '12px', marginBottom: '5px' }}
						component='p'
						fontWeight={500}>
						Метки
					</Typography>
					<Box sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
						{labels.map(({ isAdded, ...el }) => (
							<LabelPopoverItem
								key={el.id}
								isAdded={isAdded}
								label={el}
								handleSetLabel={handleUpdateLabel}
							/>
						))}
					</Box>
				</Box>
				<LabelCreatePopover />
			</Popover>
		</>
	);
};
