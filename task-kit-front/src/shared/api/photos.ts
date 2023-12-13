import { api } from '@/shared/api/base-query';
import { TaskPhoto } from '../types/task-types';
import { ApiErrorResponse } from '../types/api-error-response';
import { isAxiosError } from 'axios';

export const getPhotos = async (): Promise<ApiErrorResponse | TaskPhoto[]> => {
	try {
		const { data } = await api.get<TaskPhoto[]>(`/photo/`);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const postPhoto = async (
	photo: TaskPhoto
): Promise<ApiErrorResponse | TaskPhoto> => {
	try {
		const { data } = await api.post<TaskPhoto>(`/photo/`, photo);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};
