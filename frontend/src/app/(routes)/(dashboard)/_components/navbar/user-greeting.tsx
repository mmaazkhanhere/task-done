import { User } from "@/types/interface";
import React from "react";

type Props = {
	userData: User;
};

const UserGreeting = ({ userData }: Props) => {
	if (userData === null) {
		return (
			<p className="font-bold text-xl md:text-2xl animate-pulse">Hello</p>
		);
	}
	return (
		<div className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-0">
			<p className="font-bold text-xl md:text-2xl">
				Hello{" "}
				<span className="text-xl md:text-2xl font-light">
					{userData.name}!
				</span>
			</p>
			<p className="text-sm text-gray-400 ">Let&apos;s get it done</p>
		</div>
	);
};

export default UserGreeting;
