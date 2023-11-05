import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { isFetchBaseQueryDataWithMessage } from '../type-guards/query-error-guard';

export const showQueryError = (
	error: FetchBaseQueryError | SerializedError
): string => {
	if (isFetchBaseQueryDataWithMessage(error)) {
		const data = error.data as any;

		return data.message;
	}

	return error.message ?? 'Unknown error';
};
