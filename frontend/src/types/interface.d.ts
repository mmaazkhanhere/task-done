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
	due_date: Date;
	creator: User[];

	category_id: string;

	tasks: Task[];
}

export interface Category {
	id: string;
	title: string;
	created_at: Date;
	creator_id: string;
	creator: User[];
	projects?: Project[];
}

export interface Task {
	id: string;
	title: string;
	description: string;
	priority: string;
	due_time: Date;
	is_completed: Boolean;
	created_at: Date;

	creator_id: string;
	creator: User;
	project_id: string;
	project: Project;
}

export interface AddProjectData {
	title: string;
	description: string;
	category_id: string;
	icon: string;
	due_date: Date;
}

export interface EditProjectData {
	title: string;
	description: string;
	category_id: string;
	icon: string;
	due_date: Date;
}
