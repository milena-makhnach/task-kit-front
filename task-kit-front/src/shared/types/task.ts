import { Photo } from './photo';

export interface Task {
	deadline: Date | null;
	name: string;
	description: string | null;
	photo: Photo | null;
	user_id: number;
	column_id: number;
	order: number;
}

export interface TaskResponse extends Task {
	id: number;
}

export type CreateTask = {
	name: string;
	order: number;
	column_id: number;
};
