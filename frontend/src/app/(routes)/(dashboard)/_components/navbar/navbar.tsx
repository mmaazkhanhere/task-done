import React from "react";

import MobileSidebar from "@/app/(routes)/_components/mobile-sidebar";
import UserGreeting from "./user-greeting";

import { UserButton } from "@clerk/nextjs";
type Props = {};

const Navbar = (props: Props) => {
	return (
		<React.Fragment>
			<nav className="flex items-center justify-between h-full p-4 gap-x-4 bg-white dark:bg-muted">
				<UserGreeting name="Maaz" />

				<UserButton />
			</nav>
			<nav className="flex items-center gap-5 md:hidden py-4 px-4 bg-white dark:bg-muted">
				<MobileSidebar />
				<UserGreeting name="Maaz" />
			</nav>
		</React.Fragment>
	);
};

export default Navbar;
