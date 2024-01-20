import { api } from '@/shared/api/base-query';
import { Task, CreateTask, TaskResponse } from '../types/task';
import { isAxiosError } from 'axios';
import { ApiErrorResponse } from '../types/api-error-response';
import { QueryFunctionContext } from '@tanstack/react-query';
import { TaskPhoto } from '../types/task-types';

export const createTask = async (
	taskData: CreateTask
): Promise<ApiErrorResponse | TaskResponse> => {
	try {
		const { data } = await api.post<TaskResponse>('/task', taskData);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const getTask = async (
	context: QueryFunctionContext<
		[string, { board_id: string; task_id: string }]
	>
): Promise<ApiErrorResponse | TaskResponse> => {
	const { task_id, board_id } = context.queryKey[1];

	try {
		const { data } = await api.get(`/board/${board_id}/task/${task_id}`);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const updateTask = async (
	taskData: Partial<Task> & { id: string }
): Promise<ApiErrorResponse | TaskResponse> => {
	try {
		const { data } = await api.put<TaskResponse>(
			`/task/${taskData.id}`,
			taskData
		);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const uploadFile = async (
	file: FormData
): Promise<ApiErrorResponse | TaskPhoto> => {
	try {
		const { data } = await api.post('/task/upload/', file);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const deletedFile = async (
	id: number
): Promise<ApiErrorResponse | void> => {
	try {
		await api.delete(`/document/${id}`);
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const removeTask = async (
	task_id: number
): Promise<ApiErrorResponse | void> => {
	try {
		await api.delete(`/task/${task_id}`);
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};
