import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/base-query';
import { Task, CreateTask, TaskResponse } from '../types/task';

export const task = createApi({
	reducerPath: 'task',
	baseQuery,
	tagTypes: ['task', 'column'],
	endpoints: (builder) => ({
		createTask: builder.mutation<TaskResponse, CreateTask>({
			query: (body) => ({
				url: `/task`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['task', 'column'],
		}),
		updateTask: builder.mutation<
			TaskResponse,
			Partial<Task> & { id: number }
		>({
			query: ({ id, ...body }) => ({
				url: `/task/${id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['task', 'column'],
		}),
	}),
});

export const { useCreateTaskMutation, useUpdateTaskMutation } = task;
