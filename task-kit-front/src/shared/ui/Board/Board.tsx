import { useEffect, useState } from 'react';
import Box from '@mui/material/Box/Box';
import { useParams } from 'react-router-dom';
import { Reorder } from 'framer-motion';

import { Column } from '../Column/Column';

import styles from './Board.module.css';
import {
	ColumnResponse,
	ColumnResponse as ColumnType,
} from '@/shared/types/column';
import { api } from '@/shared/api/base-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import closeIcon from '../../../assets/icons/close.svg';

const getAllColumns = async ({ queryKey }: { queryKey: any }) => {
	const [_, { board_id }] = queryKey;
	const { data } = await api.get(`/board/${board_id}/columns`);
	return data;
};

const createColumn = async (body: any) => {
	const { board_id, ...rest } = body;
	const { data } = await api.post(`/board/${board_id}/columns`, rest);
	return data;
};

const createTask = async (body: any) => {
	const { data } = await api.post(`/task/`, body);
	return data;
};

const updateColumn = async (body: any) => {
	const { board_id, id, ...rest } = body;
	const { data } = await api.put(`/board/${board_id}/columns/${id}`, rest);
	return data;
};

const calumns = [
	{
		name: 'jopa',
		order: 1,
		id: 19,
		tasks: [
			{
				id: 19,
				name: 'task1',
				description: null,
				deadline: null,
				order: 2,
				photo: null,
				user_id: 1,
				column_id: 2,
			},
		],
	},
	{
		name: 'jopa2',
		order: 2,
		id: 119,
		tasks: [
			{
				id: 119,
				name: 'task1123',
				description: null,
				deadline: null,
				order: 3,
				photo: null,
				user_id: 1,
				column_id: 2,
			},
		],
	},
];

export const Board = () => {
	const { board_id } = useParams();
	const queryClient = useQueryClient();

	const [isColumnCreateoOpen, setIsColumnCreatorOpen] = useState(false);
	const [columnName, setColumnName] = useState<string>('');
	const [columns, setColumns] = useState<ColumnType[]>([]);

	const { data, isSuccess } = useQuery({
		queryFn: getAllColumns,
		queryKey: ['columns', { board_id }],
	});

	const { mutate } = useMutation({
		mutationFn: createColumn,
		mutationKey: ['columns'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['columns'] });
		},
	});

	const { mutate: mutateTask } = useMutation({
		mutationFn: createTask,
		mutationKey: ['tasks'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['columns'] });
		},
	});

	const { mutate: mutateColumn } = useMutation({
		mutationFn: updateColumn,
		mutationKey: ['column'],
	});

	const buttonHandler = async () => {
		if (!columnName) {
			setIsColumnCreatorOpen(false);
			return;
		}

		const newColumn = {
			name: columnName,
			order: columns.length + 1,
			tasks: [],
		};

		setColumnName('');
		setIsColumnCreatorOpen(false);

		mutate({
			...newColumn,
			board_id: board_id as string,
		});
	};

	const handleCreateTask = async (columnId: number, taskName: string) => {
		const columnIndexToChange = columns.findIndex(
			(column) => column.id === columnId
		);

		const newTask = {
			name: taskName,
			order: columns[columnIndexToChange].tasks.length + 1,
			column_id: columnId,
		};

		mutateTask(newTask);
	};

	const updateColumnOrder = (item: ColumnResponse) => {
		const findColumnIndex = columns.findIndex(
			(column) => column.id === item.id
		);

		mutateColumn({
			order: findColumnIndex + 1,
			board_id: `${board_id}`,
			id: item.id,
		});
	};

	const [canDragColumn, setCanDragColumn] = useState(true)

	const changeDrag = (value: boolean) => {
		setCanDragColumn(value)
	}

	useEffect(() => {
		if (isSuccess) {
			setColumns(data);
		}
	}, [isSuccess, data]);

	return (
		<Box className={styles.board}>
			<button
				className={
					isColumnCreateoOpen ? styles.columnCreatorBack : styles.columnCreator
				}
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
						<div className={styles.buttonsContainer}>
							<button className={styles.taskCreator} onClick={buttonHandler}>
								добавить колонку
							</button>{' '}
							<button
								className={styles.close}
								onClick={() => setIsColumnCreatorOpen(false)}
							>
								<img alt='' src={closeIcon} />
							</button>
						</div>
					</>
				) : (
					'+ Добавьте еще одну колонку'
				)}
			</button>
			<Reorder.Group
				values={columns}
				onReorder={setColumns}
				className={styles.columnsContainer}
				axis={canDragColumn ? 'x' : 'y'}
			>
				{calumns?.map((el) => (
					<Reorder.Item
						key={el.order}
						value={el}
						onDragEnd={() => updateColumnOrder(el)}
					>
						<Column
							dragColumnEvent={changeDrag }
							tasks={el.tasks}
							columnId={el.id}
							columnName={el.name}
							key={el.id}
							handleCreateTask={handleCreateTask}
						/>
					</Reorder.Item>
				))}
			</Reorder.Group>
		</Box>
	);
};
