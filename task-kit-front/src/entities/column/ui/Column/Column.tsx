import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box/Box';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { TaskResponse } from '@/shared/types/task';
import { deleteColumn, updateColumn } from '@/shared/api/column';
import { CreateTaskBtn } from '@/features/create-task-btn/ui/CreateTaskBtn';

import styles from './Column.module.css';
import { Portal } from '@/shared/ui/Portal';
import { TaskCard } from '@/widgets/TaskCard';
import { TaskExpendedCard } from '@/widgets/TaskExpendedCard/TaskExpendedCard';

import deleteIcon from '@/assets/icons/delete.svg';
import { IconButton } from '@mui/material';

type ColumnType = {
	columnId: number;
	index: number;
	tasks: TaskResponse[];
	columnName: string;
	handleCreateTask: (columnId: number, taskName: string) => void;
};

export const Column: FC<ColumnType> = ({
	columnId,
	index,
	tasks,
	columnName,
	handleCreateTask,
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const queryClient = useQueryClient();
	const { board_id } = useParams();

	const [colName, setColName] = useState<string>(columnName || '');
	const [isTaskOpen, setIsTaskOpen] = useState(false);
	const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

	const [tasksList, setTaskList] = useState<TaskResponse[]>(tasks || []);

	const { mutate: mutateColumn } = useMutation({
		mutationFn: updateColumn,
		mutationKey: ['column'],
	});

	const { mutate: deleteCol } = useMutation({
		mutationFn: deleteColumn,
		mutationKey: ['column'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['columns'] });
		},
	});

	const handleCreateNewTask = (taskName: string) => {
		handleCreateTask(columnId, taskName);
	};

	const handleUpdateColumn = () => {
		if (colName) {
			mutateColumn({
				id: columnId,
				board_id: board_id as string,
				name: colName,
			});
		} else {
			setColName(columnName);
		}
	};

	const handleClickTask = (id: number) => {
		navigate(`/board/${board_id}/task/${id}`, {
			state: { background: location },
		});
		setIsTaskOpen(true);
		setSelectedTaskId(id);
	};

	const handleCloseModal = () => {
		setIsTaskOpen(false);
		setSelectedTaskId(null);
	};

	const handleDeleteColumn = () => {
		if (board_id) {
			deleteCol({ board_id: +board_id, column_id: columnId });
		}
	};

	useEffect(() => {
		setTaskList(tasks);
	}, [tasks]);

	useEffect(() => {
		setColName(columnName);
	}, [columnName]);

	return (
		<Draggable draggableId={String(columnId)} index={index}>
			{(provided) => (
				<Box
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={styles.column}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '5px',
						}}>
						<input
							className={styles.input}
							placeholder='Заголовок колонки'
							value={colName}
							onChange={(e) => setColName(e.target.value)}
							onBlur={handleUpdateColumn}
						/>
						<IconButton
							sx={{ width: '30px', height: '30px' }}
							onClick={handleDeleteColumn}>
							<img src={deleteIcon} alt='Delete Icon' />
						</IconButton>
					</Box>
					<Droppable
						droppableId={String(columnId)}
						type='QUOTES'
						renderClone={(provided, snapshot, item) => (
							<TaskCard
								provided={provided}
								snapshot={snapshot}
								handleClickTask={handleClickTask}
								{...tasksList[item.source.index]}
							/>
						)}>
						{(dropProvided, dropSnapshot) => (
							<div
								className={`${styles.tasks} ${
									dropSnapshot.isDraggingOver &&
									styles.tasksDraggingOver
								}`}
								ref={dropProvided.innerRef}
								{...dropProvided.droppableProps}>
								{tasksList?.map((el, inx) => (
									<Draggable
										draggableId={String(el.id)}
										index={inx}
										key={el.id}>
										{(prov, snapshot) => (
											<TaskCard
												provided={prov}
												snapshot={snapshot}
												handleClickTask={
													handleClickTask
												}
												{...el}
											/>
										)}
									</Draggable>
								))}
								{dropProvided.placeholder}
							</div>
						)}
					</Droppable>
					<CreateTaskBtn handleCreateTask={handleCreateNewTask} />

					{isTaskOpen && selectedTaskId && (
						<Portal>
							<TaskExpendedCard
								closeTask={handleCloseModal}
								taskId={selectedTaskId}
								columnName={columnName}
							/>
						</Portal>
					)}
				</Box>
			)}
		</Draggable>
	);
};
