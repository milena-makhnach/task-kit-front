import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/base-query';
import { Column, ColumnResponse } from '../types/column';

type CreateColumn = Column & {
	board_id: string;
};

export const column = createApi({
	reducerPath: 'column',
	baseQuery,
	tagTypes: ['column'],
	endpoints: (builder) => ({
		createColumn: builder.mutation<ColumnResponse, CreateColumn>({
			query: ({ board_id, ...body }) => ({
				url: `/board/${board_id}/columns`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['column'],
		}),
		getAllColumns: builder.query<ColumnResponse[], string>({
			query: (board_id) => `/board/${board_id}/columns`,
			providesTags: ['column'],
		}),
		updateColumn: builder.mutation<
			ColumnResponse,
			Partial<ColumnResponse> & { board_id: string }
		>({
			query: ({ board_id, id, ...body }) => ({
				url: `/board/${board_id}/columns/${id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['column'],
		}),
	}),
});

export const {
	useCreateColumnMutation,
	useUpdateColumnMutation,
	useGetAllColumnsQuery,
} = column;
