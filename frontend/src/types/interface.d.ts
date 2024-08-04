import ReactIcon from "react-icons";

export interface Option {
	value: string;
	label: string;
}

export interface Routes {
	title: string;
	href: string;
	icon: ReactIcon;
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
	completion_date: Date;
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
	due_date: Date;
	is_completed: boolean;
	completion_date: Date;
	created_at: Date;

	creator_id: string;
	creator: User;
	project_id?: string;
	project?: Project;

	sub_tasks: SubTasks[];
}

export interface SubTasks {
	id: string;
	title: string;
	priority: string;
	due_date: Date;
	is_completed: boolean;
	completion_date: Date;
	created_at: Date;

	task_id: string;
	task: Task;

	creator_id: string;
	creator: User;
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

export interface AddTaskData {
	title: string;
	due_date: Date;
	priority: string;
}

export interface EditTaskData {
	title: string;
	due_date: Date;
	priority: string;
}

export interface AddSubtaskData {
	title: string;
	priority: string;
	due_date: Date;
}

export interface TaskDone {
	day: string;
	tasksDone: number;
}
