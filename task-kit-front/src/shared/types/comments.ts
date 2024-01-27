import { TaskResponse } from './task';
import { UserResponse } from './user-data';

export type CreateCommentType = {
	text: string;
	task_id: number;
	user_id: number;
};

export type CommentResponseType = {
	id: number;
	text: string;
	task: TaskResponse;
	user: UserResponse;
	created_at: string;
	updated_at: string;
};
