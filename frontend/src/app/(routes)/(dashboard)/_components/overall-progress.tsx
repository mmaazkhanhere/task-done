import React from "react";

type Props = {
	percentage: number;
};

const OverallProgress = ({ percentage }: Props) => {
	const progressStyle = {
		background: `linear-gradient(
            to top,
            hsl(141.9, 69.2%, 58%) ${percentage}%,
            transparent ${percentage}%
        )`,
	};
	return (
		<div className="p-4 h-63 flex flex-col items-center justify-center rounded-md bg-gray-100/50 dark:bg-muted gap-y-4">
			<span>Overall Progress</span>
			<div
				className="w-32 h-32 rounded-full flex flex-col justify-center items-center border dark:border-gray-600 text-black dark:text-white"
				style={progressStyle}
			>
				<span className="font-bold text-3xl ">{percentage}%</span>
				<span className="font-light">Progress</span>
			</div>
		</div>
	);
};

export default OverallProgress;
