import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/base-query';
import { UserResponse } from '@/shared/types/user-data';
import { LoginFormValues } from '@/shared/types/login-form-values';
import { SignupFormValues } from '../types/signup-form-values';

export const auth = createApi({
	reducerPath: 'auth',
	baseQuery,
	tagTypes: ['login', 'signup', 'logout', 'getCurrentUser'],
	endpoints: (builder) => ({
		login: builder.mutation<UserResponse, LoginFormValues>({
			query: (userData) => ({
				url: `/auth/login`,
				method: 'POST',
				body: userData,
			}),
			invalidatesTags: ['login'],
		}),
		register: builder.mutation<
			UserResponse,
			Omit<SignupFormValues, 'confirmPassword'>
		>({
			query: (userData) => ({
				url: `/auth/register`,
				method: 'POST',
				body: userData,
			}),
			invalidatesTags: ['signup'],
		}),
		logout: builder.mutation<UserResponse, void>({
			query: () => ({
				url: `/auth/logout`,
				method: 'POST',
			}),
			invalidatesTags: ['logout'],
		}),
		getCurrentUSer: builder.query<UserResponse, void>({
			query: () => `/auth/user`,
			providesTags: ['getCurrentUser'],
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useGetCurrentUSerQuery,
} = auth;
