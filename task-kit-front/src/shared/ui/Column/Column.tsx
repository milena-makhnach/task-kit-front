import { FC, useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import styles from './Column.module.css';
import Box from '@mui/material/Box/Box';
import { TaskCard } from '../TaskCard/TaskCard';
import { TaskResponse } from '@/shared/types/task';
import { api } from '@/shared/api/base-query';
import { useMutation } from '@tanstack/react-query';

type ColumnType = {
	columnId: number;
	tasks: TaskResponse[];
	columnName: string;
	handleCreateTask: (columnId: number, taskName: string) => void;
};

const updateTask = async (body: any) => {
	const { id, ...rest } = body;
	const { data } = await api.put(`/task/${id}`, rest);
	return data;
};

export const Column: FC<ColumnType> = ({
	columnId,
	tasks,
	columnName,
	handleCreateTask,
}) => {
	const [isTaskCreatorOpen, setIsTaskCreatorOpen] = useState(false);
	const [isTaskOpen, setIsTaskOpen] = useState(false);
	const [taskName, setTaskName] = useState<string>('');
	const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

	const [tasksList, setTaskList] = useState<TaskResponse[]>(tasks || []);

	const { mutate } = useMutation({
		mutationFn: updateTask,
		mutationKey: ['task'],
	});

	const buttonHandler = () => {
		if (!taskName) {
			setIsTaskCreatorOpen(false);
			return;
		}

		handleCreateTask(columnId, taskName);
		setTaskName('');
	};

	const handleUpdateTask = (task: TaskResponse) => {
		const taskToUpdate = tasksList.findIndex((item) => item.id === task.id);
		mutate({ order: taskToUpdate + 1, id: task.id });
	};

	const handleCloseModal = () => {
		setIsTaskOpen(false);
		setSelectedTaskId(null);
	};

	useEffect(() => {
		setTaskList(tasks);
	}, []);

	return (
		<Box className={styles.column}>
			<p>{columnName}</p>

			<Reorder.Group
				values={tasksList}
				onReorder={setTaskList}
				className={styles.tasks}>
				{tasksList.map((el) => (
					<Reorder.Item
						value={el}
						key={el.id}
						onDragEnd={() => handleUpdateTask(el)}
						className={styles.taskLi}>
						<button
							className={styles.task}
							onClick={() => {
								setIsTaskOpen(true);
								setSelectedTaskId(el.id);
							}}>
							{el.name}
						</button>
					</Reorder.Item>
				))}
			</Reorder.Group>

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
							placeholder='Ввести заголовок для этой карточки'
						/>
						<div>
							<button
								className={styles.taskCreator}
								onClick={buttonHandler}>
								Добавить карточку
							</button>
							<button
								className={styles.close}
								onClick={() => setIsTaskCreatorOpen(false)}>
								x
							</button>
						</div>
					</>
				) : (
					'+ добавить карточку'
				)}
			</button>
		</Box>
	);
};
