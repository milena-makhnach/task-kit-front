import { Photo } from './photo';

export interface Board {
	name: string;
	bg_color: string | null;
	photo: Photo | null;
}

export type CreateBoard = {
	name: string;
	bg_color: string | null;
	photo_id: number | null;
};

export interface BoardResponse extends Board {
	id: number;
}
