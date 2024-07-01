import ReactIcon from "react-icons";

export interface Routes {
	title: string;
	href: string;
	icon: ReactIcon;
}

export interface Option {
	value: string;
	label: string;
}

export interface Category {
	title: string;
	id: string;
	created_at: Date;
	creator_id: string;
}
