import { CreateBoard, BoardResponse } from '../types/board';
import { ApiErrorResponse } from '../types/api-error-response';
import { api } from './base-query';
import { isAxiosError } from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';

export const createBoard = async (
	boardData: CreateBoard
): Promise<ApiErrorResponse | BoardResponse> => {
	try {
		const { data } = await api.post<BoardResponse>(`/board/`, boardData);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const getBoard = async (
	context: QueryFunctionContext<[string, { board_id: string }]>
): Promise<ApiErrorResponse | BoardResponse> => {
	const board_id = context.queryKey[1].board_id;
	const { data } = await api.get<BoardResponse>(`/board/${board_id}/`);
	return data;
};

export const getAllBoards = async (): Promise<
	ApiErrorResponse | BoardResponse[]
> => {
	try {
		const { data } = await api.get<BoardResponse[]>(`/board/`);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};
