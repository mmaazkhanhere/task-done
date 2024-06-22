"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";

type Props = {
	title: string;
	href: string;
	icon: IconType;
};

const SidebarItem = ({ title, href, icon: Icon }: Props) => {
	const path = usePathname();
	const router = useRouter();

	const isActive = path === href;

	const onClick = () => {
		router.push(href);
	};

	return (
		<button
			onClick={onClick}
			className={cn(
				"py-2 md:py-3 rounded-xl bg-gray-100/50 dark:bg-muted flex items-center justify-center gap-x-2  hover:scale-95  hover:transition hover:duration-300 hover:border hover:border-green-500 text-sm md:text-base",
				isActive &&
					"bg-primary text-white hover:opacity-90 dark:bg-primary hover:border-none"
			)}
		>
			<Icon className="w-5 md:w-6 h-5 md:h-6" />
			{title}
		</button>
	);
};

export default SidebarItem;
