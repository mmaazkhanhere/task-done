import React from "react";

type Props = {
	name: string;
};

const UserGreeting = ({ name }: Props) => {
	return (
		<div className="flex flex-col items-start">
			<p className="font-bold text-2xl">
				Hello <span className="text-2xl font-light">{name}!</span>
			</p>
			<p className="text-sm text-gray-400 ">Let&apos;s get it done</p>
		</div>
	);
};

export default UserGreeting;
