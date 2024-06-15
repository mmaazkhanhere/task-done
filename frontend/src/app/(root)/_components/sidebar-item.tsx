"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";

type Props = {
	title: string;
	href: string;
	icon: IconType;
};

const SidebarItem = ({ title, href, icon: Icon }: Props) => {
	const path = usePathname();

	const isActive = path === href;

	return (
		<button
			className={cn(
				"py-2.5 md:py-3 rounded-xl bg-gray-100/50 dark:bg-muted flex items-center justify-center gap-x-2  hover:scale-95  hover:transition hover:duration-300",
				isActive &&
					"bg-primary text-white hover:opacity-90 dark:bg-primary"
			)}
		>
			<Icon size={24} />
			{title}
		</button>
	);
};

export default SidebarItem;
