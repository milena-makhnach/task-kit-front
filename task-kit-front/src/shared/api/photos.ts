import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/base-query';
import { TaskPhoto } from '../types/task-types';

export const photos = createApi({
	reducerPath: 'photos',
	baseQuery,
	tagTypes: ['getPhotos', 'postPhoto'],
	endpoints: (builder) => ({
		getPhotos: builder.query<TaskPhoto[], void>({
			query: () => '/photo',
			providesTags: ['getPhotos'],
		}),
		postPhoto: builder.mutation<TaskPhoto, TaskPhoto>({
			query: (body) => ({
				url: '/photo',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['postPhoto'],
		}),
	}),
});

export const { useGetPhotosQuery, usePostPhotoMutation } = photos;
