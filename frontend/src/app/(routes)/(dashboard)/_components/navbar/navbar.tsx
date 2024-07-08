import React from "react";

import MobileSidebar from "@/app/(routes)/_components/mobile-sidebar";
import UserGreeting from "./user-greeting";

import { UserButton } from "@clerk/nextjs";
import { User } from "@/types/interface";
type Props = {
	userData: User;
};

const Navbar = ({ userData }: Props) => {
	return (
		<React.Fragment>
			<nav className="flex items-center justify-between h-full p-4 gap-x-4 bg-white dark:bg-muted">
				<UserGreeting userData={userData} />

				<UserButton />
			</nav>
			<nav className="flex items-center gap-5 md:hidden py-4 px-4 bg-white dark:bg-muted">
				<MobileSidebar />
				<UserGreeting userData={userData} />
			</nav>
		</React.Fragment>
	);
};

export default Navbar;
