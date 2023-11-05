import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/base-query';
import { Board, BoardResponse } from '../types/board';

export const board = createApi({
	reducerPath: 'board',
	baseQuery,
	tagTypes: ['board', 'boards'],
	endpoints: (builder) => ({
		createBoard: builder.mutation<BoardResponse, Board>({
			query: (body) => ({
				url: '/board',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['board'],
		}),
		getAllBoards: builder.query<BoardResponse[], void>({
			query: () => '/board',
			providesTags: ['boards'],
		}),
		getBoardById: builder.query<BoardResponse, number>({
			query: (id) => `/board/${id}`,
			providesTags: ['boards'],
		}),
	}),
});

export const {
	useCreateBoardMutation,
	useGetAllBoardsQuery,
	useGetBoardByIdQuery,
} = board;
