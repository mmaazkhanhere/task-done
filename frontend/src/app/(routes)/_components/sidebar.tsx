import React from "react";

import Logo from "@/components/logo";
import SidebarRoutes from "./sidebar-route";
import { ModeToggle } from "@/components/mode-toggle";

type Props = {};

const Sidebar = (props: Props) => {
	return (
		<div className="flex flex-col items-center justify-between p-6 py-8 h-full overflow-y-auto shadow-md">
			<Logo />

			<div className="w-full md:pb-32">
				<SidebarRoutes />
			</div>

			<ModeToggle />
		</div>
	);
};

export default Sidebar;
