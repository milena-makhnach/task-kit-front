import { useEffect, useState } from 'react';
import Box from '@mui/material/Box/Box';
import { useParams } from 'react-router-dom';
import { Reorder } from 'framer-motion';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Column } from '../Column/Column';

import styles from './Board.module.css';
import {
	ColumnResponse,
	ColumnResponse as ColumnType,
} from '@/shared/types/column';
import { api } from '@/shared/api/base-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Board as BoardType } from '@/shared/types/board';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createTask } from '@/shared/api/task';
import { createColumn, getAllColumns, updateColumn } from '@/shared/api/column';
import { isApiError } from '@/shared/type-guards/query-error-guard';
import { getBoard } from '@/shared/api/board';

export const Board = () => {
	const { board_id } = useParams();
	const queryClient = useQueryClient();

	const [isColumnCreateoOpen, setIsColumnCreatorOpen] = useState(false);
	const [columnName, setColumnName] = useState<string>('');
	const [columns, setColumns] = useState<ColumnType[]>([]);
	const [boardData, setBoardData] = useState<BoardType | null>(null);

	const { data, isSuccess } = useQuery({
		queryFn: getAllColumns,
		queryKey: ['columns', { board_id: board_id as string }],
	});

	const { data: fetchedBoard, isSuccess: isBoardFetched } = useQuery({
		queryFn: getBoard,
		queryKey: ['board', { board_id: board_id as string }],
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
			queryClient.invalidateQueries({
				queryKey: ['columns', { board_id }],
			});
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

	useEffect(() => {
		if (isSuccess) {
			if (!isApiError(data)) {
				setColumns(data);
			}
		}
	}, [isSuccess, data]);

	useEffect(() => {
		if (isBoardFetched) {
			if (!isApiError(fetchedBoard)) {
				setBoardData(fetchedBoard);
			}
		}
	}, [isBoardFetched, fetchedBoard]);

	useEffect(() => {
		if (boardData?.bg_color) {
			localStorage.setItem('theme', boardData.bg_color);
		}

		if (boardData?.photo) {
			localStorage.setItem('photo', boardData?.photo?.file);
		}

		return () => {
			localStorage.removeItem('theme');
			localStorage.removeItem('photo');
		};
	}, [boardData]);

	// const move = (
	// 	source,
	// 	destination,
	// 	droppableSource,
	// 	droppableDestination
	// ) => {
	// 	const sourceClone = Array.from(source);
	// 	const destClone = Array.from(destination);
	// 	const [removed] = sourceClone.splice(droppableSource.index, 1);

	// 	destClone.splice(droppableDestination.index, 0, removed);

	// 	const result = {};
	// 	result[droppableSource.droppableId] = sourceClone;
	// 	result[droppableDestination.droppableId] = destClone;

	// 	return result;
	// };

	// const onDragEnd = (result: any) => {
	// 	const { source, destination } = result;

	// 	if (!destination) {
	// 		return;
	// 	}
	// 	const sInd = +source.droppableId;
	// 	const dInd = +destination.droppableId;

	// 	if (sInd === dInd) {
	// 		const items = reorder(
	// 			columns[sInd],
	// 			source.index,
	// 			destination.index
	// 		);
	// 		const newState = [...columns];
	// 		newState[sInd] = items;
	// 		setColumns(newState);
	// 	} else {
	// 		const result = move(
	// 			columns[sInd],
	// 			columns[dInd],
	// 			source,
	// 			destination
	// 		);
	// 		const newState = [...columns];
	// 		newState[sInd] = result[sInd];
	// 		newState[dInd] = result[dInd];

	// 		setColumns(newState.filter((group) => group.length));
	// 	}
	// };

	// const reorder = (list, startIndex, endIndex) => {
	// 	const result = Array.from(list);
	// 	const [removed] = result.splice(startIndex, 1);
	// 	result.splice(endIndex, 0, removed);

	// 	return result;
	// };

	return (
		<Box
			className={styles.boardContent}
			sx={{
				backgroundColor: boardData?.bg_color ? boardData.bg_color : '',
				backgroundImage: boardData?.photo
					? `url(${boardData.photo.file})`
					: '',
			}}>
			<DragDropContext onDragEnd={() => {}}>
				<Box className={styles.board}>
					<button
						className={
							isColumnCreateoOpen
								? styles.columnCreatorBack
								: styles.columnCreator
						}
						onClick={
							isColumnCreateoOpen
								? () => {}
								: () => setIsColumnCreatorOpen(true)
						}>
						{isColumnCreateoOpen ? (
							<>
								<textarea
									className={styles.textInput}
									value={columnName}
									onChange={(e) =>
										setColumnName(e.target.value)
									}
									placeholder='Заголовок списка'
								/>
								<div className={styles.buttonsContainer}>
									<button
										className={styles.taskCreator}
										onClick={buttonHandler}>
										Добавить колонку
									</button>
									<IconButton
										className={styles.close}
										sx={{ width: '30px', height: '30px' }}
										onClick={() =>
											setIsColumnCreatorOpen(false)
										}>
										<CloseIcon
											sx={{
												width: '20px',
												height: '20px',
											}}
										/>
									</IconButton>
								</div>
							</>
						) : (
							'+ Добавьте еще одну колонку'
						)}
					</button>
					<div className={styles.columnsContainer}>
						{columns?.map((el, ind) => (
							<Droppable key={ind} droppableId={String(ind)}>
								{(provided) => (
									<Column
										tasks={el.tasks}
										columnId={el.id}
										columnName={el.name}
										key={el.id}
										handleCreateTask={handleCreateTask}
										{...provided}
									/>
								)}
							</Droppable>
						))}
					</div>
				</Box>
			</DragDropContext>
		</Box>
	);
};
