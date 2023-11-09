import { useState } from 'react';
import styles from './Board.module.css';

import Box from '@mui/material/Box/Box';
import { Column } from '../Column/Column';

export const Board = () => {
	const [isColumnCreateoOpen, setIsColumnCreatorOpen] = useState(false);
	const [columnName, setColumnName] = useState<string>('');
	const [columns, setColumns] = useState<string[]>([]);

	const [taskName, setTaskName] = useState<string>('');
	const [tasks, setTasks] = useState<string[]>([]);

	const buttonHandler = () => {
        setColumns((prev) => [...prev, columnName]);
        setColumnName('')
	};
	return (
		<Box className={styles.board}>
			<button
				className={isColumnCreateoOpen ? styles.columnCreatorBack : styles.columnCreator}
				onClick={
					isColumnCreateoOpen ? () => {} : () => setIsColumnCreatorOpen(true)
				}
			>
				{isColumnCreateoOpen ? (
					<>
                        <textarea
                            className={styles.textInput}
							value={columnName}
							onChange={(e) => setColumnName(e.target.value)}
							placeholder='ввести заголовок списка'
                        />
                        <div>

						<button className={styles.taskCreator} onClick={buttonHandler}>добавить колонку</button>{' '}
						<button className={styles.close} onClick={() => setIsColumnCreatorOpen(false)}>X</button>
                        </div>
					</>
				) : (
					'+ Добавьте еще одну колонку'
				)}
			</button>

			{columns.map((el) => (
				<Column
					columnName={el}
					setTaskName={setTaskName}
					setTasks={setTasks}
					taskName={taskName}
					tasks={tasks}
					key={el}
				/>
			))}
		</Box>
	);
};
