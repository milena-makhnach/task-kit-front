import { FC, useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Reorder } from 'framer-motion';
import styles from './Column.module.css';
import Box from '@mui/material/Box/Box';
import { TaskCard } from '../TaskCard/TaskCard';
import { TaskResponse } from '@/shared/types/task';
import { api } from '@/shared/api/base-query';
import { useMutation } from '@tanstack/react-query';
import { IconButton } from '@mui/material';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import CloseIcon from '@mui/icons-material/Close';
import { updateTask } from '@/shared/api/task';
import { updateColumn } from '@/shared/api/column';

type ColumnType = {
	columnId: number;
	tasks: TaskResponse[];
	columnName: string;
	handleCreateTask: (columnId: number, taskName: string) => void;
};

export const Column: FC<ColumnType> = ({
	columnId,
	tasks,
	columnName,
	handleCreateTask,
	...rest
}) => {
	const { board_id } = useParams();
	const location = useLocation();

	const [colName, setColName] = useState<string>(columnName || '');
	const [isTaskCreatorOpen, setIsTaskCreatorOpen] = useState(false);
	const [isTaskOpen, setIsTaskOpen] = useState(false);
	const [taskName, setTaskName] = useState<string>('');
	const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

	const [tasksList, setTaskList] = useState<TaskResponse[]>(tasks || []);

	const { mutate } = useMutation({
		mutationFn: updateTask,
		mutationKey: ['task'],
	});

	const { mutate: mutateColumn } = useMutation({
		mutationFn: updateColumn,
		mutationKey: ['column'],
	});

	const buttonHandler = () => {
		// if (!taskName) {
		// 	setIsTaskCreatorOpen(false);
		// 	return;
		// }

		setIsTaskCreatorOpen(false);

		handleCreateTask(columnId, taskName);
		setTaskName('');
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

	const handleUpdateTask = (task: TaskResponse) => {
		const taskToUpdate = tasksList.findIndex((item) => item.id === task.id);
		mutate({ order: taskToUpdate + 1, id: `${task.id}` });
	};

	const handleCloseModal = () => {
		setIsTaskOpen(false);
		setSelectedTaskId(null);
	};

	useEffect(() => {
		setTaskList(tasks);
	}, [tasks]);

	useEffect(() => {
		setColName(columnName);
	}, [columnName]);

	return (
		<Box
			className={styles.column}
			//@ts-ignore
			{...rest.droppableProps}
			//@ts-ignore
			ref={rest.innerRef}>
			<input
				className={styles.input}
				placeholder='Заголовок колонки'
				value={colName}
				onChange={(e) => setColName(e.target.value)}
				onBlur={handleUpdateColumn}
			/>

			<div className={styles.tasks}>
				{tasksList?.map((el, index) => (
					<Draggable
						draggableId={String(el.id)}
						index={index}
						key={el.id}>
						{(prov) => (
							<Link
								to={`/board/${board_id}/task/${el.id}`}
								state={{ background: location }}
								className={styles.taskLi}
								{...prov.draggableProps}
								{...prov.dragHandleProps}
								ref={prov.innerRef}>
								<button
									className={styles.task}
									onClick={(e) => {
										setIsTaskOpen(true);
										setSelectedTaskId(el.id);
									}}>
									{el.name}
								</button>
							</Link>
						)}
					</Draggable>
				))}
				{/* {provided.placeholder} */}
			</div>
			{isTaskOpen && selectedTaskId && (
				<TaskCard
					closeTask={handleCloseModal}
					taskId={selectedTaskId}
					columnName={columnName}
				/>
			)}
			<button
				className={styles.taskCreatorBack}
				onClick={
					isTaskCreatorOpen
						? () => {}
						: () => setIsTaskCreatorOpen(true)
				}>
				{isTaskCreatorOpen ? (
					<>
						<textarea
							className={styles.taskInput}
							value={taskName}
							onChange={(e) => setTaskName(e.target.value)}
							placeholder='Заголовок карточки'
						/>
						<Box className={styles.buttonsContainer}>
							<button
								className={styles.taskCreator}
								onClick={buttonHandler}>
								Добавить карточку
							</button>
							<IconButton
								sx={{ width: '30px', height: '30px' }}
								onClick={() => setIsTaskCreatorOpen(false)}>
								<CloseIcon
									sx={{
										width: '20px',
										height: '20px',
									}}
								/>
							</IconButton>
						</Box>
					</>
				) : (
					'+ добавить карточку'
				)}
			</button>
		</Box>
	);
};
