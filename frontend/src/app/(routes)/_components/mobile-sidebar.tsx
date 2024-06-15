import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { RiMenu2Fill } from "react-icons/ri";
import Sidebar from "./sidebar";

type Props = {};

const MobileSidebar = (props: Props) => {
	return (
		<div>
			<Sheet>
				<SheetTrigger>
					<RiMenu2Fill size={25} />
				</SheetTrigger>
				<SheetContent side="top" className="h-full">
					<Sidebar />
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default MobileSidebar;
