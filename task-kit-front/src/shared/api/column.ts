import { Column, ColumnResponse } from '../types/column';
import { ApiErrorResponse } from '../types/api-error-response';
import { api } from './base-query';
import { isAxiosError } from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';

type CreateColumn = Column & {
	board_id: string;
};

export const createColumn = async (
	columnData: CreateColumn
): Promise<ApiErrorResponse | ColumnResponse> => {
	const { board_id, ...body } = columnData;
	try {
		const { data } = await api.post<ColumnResponse>(
			`/board/${board_id}/columns`,
			body
		);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const getAllColumns = async (
	context: QueryFunctionContext<[string, { board_id: string }]>
): Promise<ApiErrorResponse | ColumnResponse[]> => {
	try {
		const board_id = context.queryKey[1].board_id;

		const { data } = await api.get<ColumnResponse[]>(
			`/board/${board_id}/columns`
		);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const updateColumn = async (
	columnData: Partial<ColumnResponse> & { board_id: string }
): Promise<ApiErrorResponse | ColumnResponse> => {
	const { board_id, id, ...body } = columnData;
	try {
		const { data } = await api.put<ColumnResponse>(
			`/board/${board_id}/columns/${id}`,
			body
		);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const deleteColumn = async (ids: {
	board_id: number;
	column_id: number;
}): Promise<ApiErrorResponse | void> => {
	try {
		await api.delete(`/board/${ids.board_id}/columns/${ids.column_id}`);
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};
