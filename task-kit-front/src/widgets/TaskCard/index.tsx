import { FC } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

import styles from './TaskCard.module.css';
import { TaskResponse } from '@/shared/types/task';

type TaskCardPropsType = TaskResponse & {
	provided: DraggableProvided;
	snapshot: DraggableStateSnapshot;
	handleClickTask: (id: number) => void;
};

export const TaskCard: FC<TaskCardPropsType> = ({
	provided,
	snapshot,
	handleClickTask,
	...task
}) => {
	return (
		<div
			ref={provided.innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
			className={`${styles.task} ${
				snapshot.isDragging && styles.taskDragging
			}`}
			onClick={() => handleClickTask(task.id)}>
			{task.name}
		</div>
	);
};
