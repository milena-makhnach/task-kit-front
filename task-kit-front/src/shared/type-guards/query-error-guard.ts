import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const isFetchBaseQueryDataWithMessage = (
	error: FetchBaseQueryError | SerializedError
): error is FetchBaseQueryError => {
	return 'data' in error;
};
