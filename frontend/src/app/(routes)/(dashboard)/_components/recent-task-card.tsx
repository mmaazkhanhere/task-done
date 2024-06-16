import React from "react";

type Props = {
	_id: number;
	taskName: string;
	createdAt: string;
	projectName: string;
	status: string;
};

const RecentTaskCard = ({
	taskName,
	createdAt,
	projectName,
	status,
}: Props) => {
	return (
		<div className="flex items-center justify-around gap-x-5 w-full bg-white dark:bg-muted-foreground/30 rounded-md py-1">
			<p className="font-bold text-sm md:text-base">{taskName}</p>
			<div className="hidden md:flex flex-col text-xs md:text-sm">
				<p className="font-light">Created At</p>
				<p className="text-green-500">{createdAt}</p>
			</div>
			<div className="flex flex-col text-xs md:text-sm">
				<p className="font-light">Project In</p>
				<p className="text-green-500">{projectName}</p>
			</div>
			<div className="flex flex-col text-xs md:text-sm">
				<p className="font-light">Status</p>
				<p className="text-green-500">{status}</p>
			</div>
		</div>
	);
};

export default RecentTaskCard;
