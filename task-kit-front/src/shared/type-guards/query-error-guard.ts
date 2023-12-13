import { ApiErrorResponse } from '../types/api-error-response';

export const isApiError = (error: unknown): error is ApiErrorResponse => {
	return error !== null && typeof error === 'object' && 'message' in error;
};
