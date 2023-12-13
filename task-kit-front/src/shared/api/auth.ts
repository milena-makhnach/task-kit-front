import { ApiErrorResponse } from '../types/api-error-response';
import { UserResponse } from '@/shared/types/user-data';
import { LoginFormValues } from '@/shared/types/login-form-values';
import { SignupFormValues } from '../types/signup-form-values';
import { api } from './base-query';
import { isAxiosError } from 'axios';
import { InviteCreateType, InviteReponseType } from '../types/invite';

export const login = async (
	userCreds: LoginFormValues
): Promise<ApiErrorResponse | UserResponse> => {
	try {
		const { data } = await api.post<UserResponse>('/auth/login', userCreds);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const register = async (
	userData: Omit<SignupFormValues, 'confirmPassword'>
): Promise<ApiErrorResponse | UserResponse> => {
	try {
		const { data } = await api.post<UserResponse>(
			'/auth/register',
			userData
		);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const logout = async (): Promise<ApiErrorResponse | void> => {
	try {
		await api.post<void>('/auth/logout');
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const getCurrentUSer = async (): Promise<
	ApiErrorResponse | UserResponse
> => {
	try {
		const { data } = await api.get<UserResponse>('/auth/user');

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const updateUser = async (
	userData: Partial<UserResponse>
): Promise<UserResponse | ApiErrorResponse> => {
	try {
		const { data } = await api.put(`/auth/user/`, userData);
		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};

export const invite = async (
	inviteData: InviteCreateType
): Promise<ApiErrorResponse | InviteReponseType> => {
	try {
		const { data } = await api.post('/auth/invite', inviteData);

		return data;
	} catch (err) {
		if (isAxiosError(err)) {
			return err?.response?.data;
		}

		return { message: 'Unexpected error', code: 400 };
	}
};
