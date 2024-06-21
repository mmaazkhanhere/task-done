"use client";

import React from "react";

import SidebarItem from "./sidebar-item";

import { Routes } from "@/types/interface";

import { MdDashboard } from "react-icons/md";
import { FaTasks, FaProjectDiagram } from "react-icons/fa";
import { RiStackFill } from "react-icons/ri";

type Props = {};

const routes: Routes[] = [
	{
		title: "Overview",
		href: "/",
		icon: MdDashboard,
	},
	{
		title: "Tasks List",
		href: "/tasks",
		icon: FaTasks,
	},
	{
		title: "Projects",
		href: "/projects",
		icon: FaProjectDiagram,
	},
	{
		title: "Categories",
		href: "/categories",
		icon: RiStackFill,
	},
];

const SidebarRoutes = (props: Props) => {
	return (
		<div className="flex flex-col w-full gap-y-3 md:gap-y-5 pt-16 md:pt-20">
			{routes.map((route: Routes) => (
				<SidebarItem
					key={route.href}
					title={route.title}
					icon={route.icon}
					href={route.href}
				/>
			))}
		</div>
	);
};

export default SidebarRoutes;
