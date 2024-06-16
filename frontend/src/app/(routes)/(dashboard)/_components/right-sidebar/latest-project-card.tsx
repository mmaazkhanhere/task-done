import React from "react";

import { Progress } from "@/components/ui/progress";

import { FaProjectDiagram } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";

type Props = {
	title: string;
	totalTasks: number;
	tasksCompleted: number;
};

const LatestProjectCard = ({ title, totalTasks, tasksCompleted }: Props) => {
	const progress = Math.round((tasksCompleted / totalTasks) * 100);

	return (
		<div className="flex flex-col gap-6 p-4 rounded-md bg-white dark:bg-muted-foreground/30 w-full">
			<div className="flex gap-2 items-center">
				<FaProjectDiagram className="bg-primary p-1 text-white rounded-full w-5 h-5" />
				<span>{title}</span>
			</div>
			<div className="flex flex-col items-start gap-1 w-full">
				<div className="flex items-center justify-between gap-2 w-full">
					<div className="flex items-center gap-2">
						<span className="text-sm md:text-base">Progress</span>
						<FaBarsProgress />
					</div>
					<div className="flex items-center gap-2">
						<p className="text-sm md:text-base">
							<span>{tasksCompleted}</span>/{totalTasks}
						</p>
					</div>
				</div>
				<Progress value={progress} />
			</div>
		</div>
	);
};

export default LatestProjectCard;
