import Logo from "@/components/logo";
import React from "react";
import SidebarRoutes from "./sidebar-route";
import { ModeToggle } from "@/components/mode-toggle";

type Props = {};

const Sidebar = (props: Props) => {
	return (
		<div className="flex flex-col items-center justify-between p-6 py-16 h-full overflow-y-auto shadow-sm">
			<Logo />

			<div className="w-full lg:pb-32">
				<SidebarRoutes />
			</div>

			<ModeToggle />
		</div>
	);
};

export default Sidebar;
