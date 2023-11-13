import { TaskResponse } from './task';

export interface Column {
	name: string;
	order: number;
	tasks: TaskResponse[];
}

export interface ColumnResponse extends Column {
	id: number;
}
