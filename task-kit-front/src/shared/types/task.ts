import { Photo } from './photo';

export interface Task {
	deadline: Date;
	name: string;
	description: string;
	photo: Photo;
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
