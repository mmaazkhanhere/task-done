"use client";

import React from "react";

import SidebarItem from "./sidebar-item";

import { Routes } from "@/types/interface";

import { MdDashboard, MdCategory } from "react-icons/md";
import { GoTasklist } from "react-icons/go";

type Props = {};

const routes: Routes[] = [
	{
		title: "Dashboard",
		href: "/",
		icon: MdDashboard,
	},
	{
		title: "Projects",
		href: "/projects",
		icon: GoTasklist,
	},
	{
		title: "Categories",
		href: "/categories",
		icon: MdCategory,
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
