import { CommentResponseType } from './comments';
import { DocumentType } from './document';
import { Photo } from './photo';
import { UserResponse } from './user-data';

export interface Task {
	deadline: Date | null;
	name: string;
	description: string | null;
	photo: Photo | null;
	users: UserResponse[];
	column_id: number;
	order: number;
	comments: CommentResponseType[];
	files: DocumentType[];
}

export interface TaskResponse extends Task {
	id: number;
}

export type CreateTask = {
	name: string;
	order: number;
	column_id: number;
};
