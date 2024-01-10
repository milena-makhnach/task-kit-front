import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box/Box';
import { useParams } from 'react-router-dom';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import { Column } from '../../../column/ui/Column/Column';

import styles from './Board.module.css';
import {
	ColumnResponse,
	ColumnResponse as ColumnType,
} from '@/shared/types/column';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Board as BoardType } from '@/shared/types/board';
import { createTask } from '@/shared/api/task';
import { createColumn, getAllColumns, updateColumn } from '@/shared/api/column';
import { isApiError } from '@/shared/type-guards/query-error-guard';
import { getBoard } from '@/shared/api/board';
import { Photo } from '@/shared/types/photo';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/store/store';
import { CreateColumnBtn } from '@/features/create-column-btn/ui/CreateColumnBtn';
import { reorder, reorderQuoteMap } from '../model/reorder-tasks-utils';

type BoardPropsType = {
	setBoardBg: (bg: Photo | string | null) => void;
};

export const Board: FC<BoardPropsType> = ({ setBoardBg }) => {
	const { theme } = useSelector((state: RootState) => state.theme);
	const { board_id } = useParams();
	const queryClient = useQueryClient();

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

	const handleCreateColumn = async (columnName: string) => {
		const newColumn = {
			name: columnName,
			order: columns.length + 1,
			tasks: [],
		};

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
		if (boardData) {
			setBoardBg(boardData.photo || boardData.bg_color);
		}
	}, [theme, boardData]);

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		const source = result.source;
		const destination = result.destination;

		if (
			source &&
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		) {
			return;
		}

		if (result.type === 'COLUMN' && source) {
			const reorderedorder = reorder(
				columns,
				source.index,
				destination.index
			);

			setColumns(reorderedorder);

			return;
		}

		const data = reorderQuoteMap({
			quoteMap: columns,
			source,
			destination,
		});

		setColumns(data.quoteMap);
	};

	return (
		<Box className={styles.boardContent}>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable
					droppableId='board'
					type='COLUMN'
					direction='horizontal'>
					{(provided) => (
						<Box
							className={styles.board}
							ref={provided.innerRef}
							{...provided.droppableProps}>
							<Box className={styles.columnsContainer}>
								{columns?.map((el, index) => (
									<Column
										tasks={el.tasks}
										index={index}
										columnId={el.id}
										columnName={el.name}
										key={el.id}
										handleCreateTask={handleCreateTask}
									/>
								))}
							</Box>
							{provided.placeholder}
						</Box>
					)}
				</Droppable>
			</DragDropContext>
			<CreateColumnBtn handleCreateColumn={handleCreateColumn} />
		</Box>
	);
};
