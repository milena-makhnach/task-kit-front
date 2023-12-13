import { isAxiosError } from 'axios';
import { api } from './base-query';
import { ApiErrorResponse } from '../types/api-error-response';
import { CommentResponseType, CreateCommentType } from '../types/comments';

export const createComment = async (
	commentData: CreateCommentType
): Promise<ApiErrorResponse | CommentResponseType> => {
	try {
		const { data } = await api.post<CommentResponseType>(
			`/comment/`,
			commentData
		);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};
