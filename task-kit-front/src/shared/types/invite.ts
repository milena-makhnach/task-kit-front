import { UserResponse } from './user-data';

export type InviteReponseType = {
	id: number;
	email: string;
	board_id: number;
	user: UserResponse;
	created_at: Date;
	updated_at: Date;
};

export type InviteCreateType = {
	email: string;
	board_id: string;
	user_id: number;
};
