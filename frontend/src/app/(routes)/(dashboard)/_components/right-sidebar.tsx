import React from "react";

type Props = {
	percentage: number;
};

const RightSideBar = ({ percentage }: Props) => {
	const progressStyle = {
		background: `linear-gradient(to top, #34D399 ${percentage}%, transparent ${percentage}%)`,
	};

	return (
		<div className="w-3/12 p-4 flex flex-col gap-4">
			<div className="p-4 h-63 flex flex-col items-center justify-center rounded-md bg-gray-100/50 dark:bg-muted">
				<span>Overall Progress</span>
				<div
					className="w-32 h-32 rounded-full flex flex-col justify-center items-center border dark:border-gray-600 text-black dark:text-white"
					style={progressStyle}
				>
					<span className="font-bold text-3xl ">{percentage}%</span>
					<span className="font-light">Progress</span>
				</div>
			</div>
		</div>
	);
};

export default RightSideBar;
