import { ApiErrorResponse } from '../types/api-error-response';
import { LabelType } from '../types/label';
import { api } from './base-query';
import { isAxiosError } from 'axios';

export const createTaskLabel = async (data: {
	label_id: number;
	task_id: number;
}): Promise<ApiErrorResponse | void> => {
	try {
		await api.post(`/task/label/`, data);
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const removeTaskLabel = async (data: {
	label_id: number;
	task_id: number;
}): Promise<ApiErrorResponse | void> => {
	try {
		await api.delete(`/task/${data.task_id}/label/${data.label_id}`);
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const createLabel = async (
	label: Omit<LabelType, 'id'>
): Promise<ApiErrorResponse | LabelType> => {
	try {
		const { data } = await api.post<LabelType>(`/label/`, label);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const updateLabel = async (
	label: Partial<LabelType> & { id: number }
): Promise<ApiErrorResponse | LabelType> => {
	try {
		const { data } = await api.patch<LabelType>(
			`/label/${label.id}`,
			label
		);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const deleteLabel = async (
	id: number
): Promise<ApiErrorResponse | void> => {
	try {
		await api.delete(`/label/${id}`);
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};
