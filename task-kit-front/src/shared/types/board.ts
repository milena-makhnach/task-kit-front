export interface Board {
	name: string;
	document_id: number | null;
	background_color: string | null;
	photo_id: string | null;
}

export interface BoardResponse extends Board {
	id: number;
}
