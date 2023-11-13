import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/base-query';
import { CreateBoard, BoardResponse } from '../types/board';

export const board = createApi({
	reducerPath: 'board',
	baseQuery,
	tagTypes: ['board'],
	refetchOnReconnect: true,
	endpoints: (builder) => ({
		createBoard: builder.mutation<BoardResponse, CreateBoard>({
			query: (body) => ({
				url: '/board',
				method: 'POST',
				body,
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: 'board', id: result?.id },
			],
		}),
		getAllBoards: builder.query<BoardResponse[], void>({
			query: () => '/board',
			providesTags: (result, error, arg) =>
				result
					? [
							...result.map(({ id }) => ({
								type: 'board' as const,
								id,
							})),
							'board',
					  ]
					: ['board'],
		}),
	}),
});

export const { useCreateBoardMutation, useGetAllBoardsQuery } = board;
