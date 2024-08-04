import React from "react";

import { IconType } from "react-icons";

type Props = {
	title: string;
	value: number;
	icon: IconType;
};

const StatisticsCard = ({ title, value, icon: Icon }: Props) => {
	return (
		<article className="group bg-primary p-3 rounded-xl flex items-center justify-between px-4">
			<div className="flex flex-col ">
				<h2 className="text-white text-3xl font-bold">{value}</h2>
				<p className="text-gray-100 font-light">{title}</p>
			</div>
			<div className="bg-white rounded-full p-2 h-12 w-12 flex items-center justify-center">
				<Icon className=" text-green-500 group-hover:animate-spin w-6 md:w-7 h-6 md:h-7" />
			</div>
		</article>
	);
};

export default StatisticsCard;
