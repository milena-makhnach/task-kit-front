import { FC, useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Reorder } from 'framer-motion';
import styles from './Column.module.css';
import Box from '@mui/material/Box/Box';
import { TaskCard } from '../../../../shared/ui/TaskCard/TaskCard';
import { TaskResponse } from '@/shared/types/task';
import { api } from '@/shared/api/base-query';
import { useMutation } from '@tanstack/react-query';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { updateTask } from '@/shared/api/task';
import { updateColumn } from '@/shared/api/column';
import { CreateTaskBtn } from '@/features/create-task-btn/ui/CreateTaskBtn';

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
	const { board_id } = useParams();
	const location = useLocation();

	const [colName, setColName] = useState<string>(columnName || '');
	const [isTaskOpen, setIsTaskOpen] = useState(false);
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
		<Draggable draggableId={String(columnId)} index={index}>
			{(provided) => (
				<Box
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={styles.column}>
					<input
						className={styles.input}
						placeholder='Заголовок колонки'
						value={colName}
						onChange={(e) => setColName(e.target.value)}
						onBlur={handleUpdateColumn}
					/>
					<Droppable
						droppableId={String(columnId)}
						type='QUOTES'
						renderClone={(provided, snapshot, item) => (
							<div
								className={styles.taskLi}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								ref={provided.innerRef}>
								{/* <Link
										to={`/board/${board_id}/task/${el.id}`}
										state={{
											background: location,
										}}>
										<button
											className={styles.task}
											onClick={(e) => {
												setIsTaskOpen(true);
												setSelectedTaskId(
													el.id
												);
											}}>
											{el.name}
										</button>
									</Link> */}
								{tasksList[item.source.index].name}
							</div>
						)}>
						{(dropProvided, dropSnapshot) => (
							<div
								className={styles.tasks}
								ref={dropProvided.innerRef}
								{...dropProvided.droppableProps}>
								{tasksList?.map((el, inx) => (
									<Draggable
										draggableId={String(el.id)}
										index={inx}
										key={el.id}>
										{(prov) => (
											<div
												key={el.id}
												className={styles.taskLi}
												{...prov.draggableProps}
												{...prov.dragHandleProps}
												ref={prov.innerRef}>
												{/* <Link
													to={`/board/${board_id}/task/${el.id}`}
													state={{
														background: location,
													}}>
													<button
														className={styles.task}
														onClick={(e) => {
															setIsTaskOpen(true);
															setSelectedTaskId(
																el.id
															);
														}}>
														{el.name}
													</button>
												</Link> */}
												{el.name}
											</div>
										)}
									</Draggable>
								))}
								{dropProvided.placeholder}
							</div>
						)}
					</Droppable>
					<CreateTaskBtn handleCreateTask={handleCreateNewTask} />

					{/* {isTaskOpen && selectedTaskId && (
						<TaskCard
							closeTask={handleCloseModal}
							taskId={selectedTaskId}
							columnName={columnName}
						/>
					)} */}
				</Box>
			)}
		</Draggable>
	);
};
