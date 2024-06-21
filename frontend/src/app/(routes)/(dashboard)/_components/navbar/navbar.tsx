"use client";

import React, { useState } from "react";

import MobileSidebar from "@/app/(routes)/_components/mobile-sidebar";
import UserGreeting from "./user-greeting";
import SearchBar from "./search-bar";

import { IoIosSearch, IoMdClose } from "react-icons/io";
type Props = {};

const Navbar = (props: Props) => {
	const [showSearch, setShowSearch] = useState<boolean>(false);

	return (
		<React.Fragment>
			<nav className="hidden md:flex items-center justify-between h-full p-4 gap-x-4 bg-white dark:bg-muted">
				<UserGreeting name="Maaz" />

				{showSearch && <SearchBar />}

				<div className="flex items-center justify-center gap-x-5">
					{!showSearch && (
						<button onClick={() => setShowSearch(true)}>
							<IoIosSearch className="w-7 h-7" />
						</button>
					)}
					{showSearch && (
						<button onClick={() => setShowSearch(false)}>
							<IoMdClose className="w-6 h-6" />
						</button>
					)}

					<div className="w-10 h-10 rounded-full border bg-green-500" />
				</div>
			</nav>
			<nav className="flex items-center gap-5 md:hidden py-4 px-4 bg-white dark:bg-muted">
				<MobileSidebar />
				<UserGreeting name="Maaz" />
			</nav>
		</React.Fragment>
	);
};

export default Navbar;
