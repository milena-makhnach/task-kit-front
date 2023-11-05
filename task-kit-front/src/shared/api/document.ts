import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/base-query';
import { TaskPhoto } from '../types/task-types';

export const document = createApi({
	reducerPath: 'document',
	baseQuery,
	tagTypes: ['getPhotos', 'getPhoto'],
	endpoints: (builder) => ({
		getPhotos: builder.query<TaskPhoto[], void>({
			query: () => '/photos',
			providesTags: ['getPhotos'],
		}),
		getPhotoById: builder.query<TaskPhoto, number>({
			query: (id) => `/photos/${id}`,
			providesTags: ['getPhoto'],
		}),
	}),
});

export const { useGetPhotosQuery } = document;
