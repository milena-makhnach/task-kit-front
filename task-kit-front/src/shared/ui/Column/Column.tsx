import { FC, useState } from 'react';
import styles from './Column.module.css';
import Box from '@mui/material/Box/Box';
import { TaskCard } from '../TaskCard/TaskCard';

type ColumnType = {
	columnName: string;
	tasks: string[];
	taskName: string;
	setTasks: React.Dispatch<React.SetStateAction<string[]>>;
	setTaskName: React.Dispatch<React.SetStateAction<string>>;
};
export const Column: FC<ColumnType> = ({
	columnName,
	tasks,
	setTasks,
	setTaskName,
	taskName,
}) => {
	const [isTaskCreatorOpen, setIsTaskCreatorOpen] = useState(false);
	const [isTaskOpen, setIsTaskOpen] = useState(false);

	const buttonHandler = () => {
		setTasks((prev) => [...prev, taskName]);
		setTaskName('');
	};
	return (
		<Box className={styles.column}>
			<p>{columnName}</p>

			{tasks.map((el) => (
				<button className={styles.task} onClick={() => setIsTaskOpen(true)}>{el}</button>
			))}
			{isTaskOpen && <TaskCard closeTask={setIsTaskOpen} />}
			<button
				className={styles.taskCreatorBack}
				onClick={
					isTaskCreatorOpen ? () => {} : () => setIsTaskCreatorOpen(true)
				}
			>
				{isTaskCreatorOpen ? (
					<>
						<textarea
							className={styles.taskInput}
							value={taskName}
							onChange={(e) => setTaskName(e.target.value)}
							placeholder='Ввести заголовок для этой карточки'
						/>
						<div>
							<button className={styles.taskCreator} onClick={buttonHandler}>
								Добавить карточку
							</button>
							<button
								className={styles.close}
								onClick={() => setIsTaskCreatorOpen(false)}
							>
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
