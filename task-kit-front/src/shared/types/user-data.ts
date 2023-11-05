export interface User {
	id: number | null;
	firstname: string;
	lastname: string;
	email: string;
	avatar: string;
}

export interface UserResponse {
	id: number | null;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
	created_at: string;
	updated_at: string;
}
