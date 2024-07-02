import ReactIcon from "react-icons";

export interface Option {
	value: string;
	label: string;
}

export interface User {
	id: string;
	name: string;
	username: string;
	email: string;
	created_at: Date;
}

export interface Project {
	id: string;
	title: string;
	description: string;
	is_completed: Boolean;
	icon: string;
	created_at: Date;
	creator_id: string;
	creator: User[];
}

export interface Category {
	id: string;
	title: string;
	created_at: Date;
	creator_id: string;
	creator: User[];
	projects?: Project[];
}

export interface AddProjectData {
	title: string;
	description: string;
	category: { label: string; value: string }[];
	icon: string;
}
