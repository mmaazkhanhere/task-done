import { Progress } from "@/components/ui/progress";
import React from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";

type Props = {
	title: string;
	totalTasks: number;
	tasksCompleted: number;
	category: string[];
};

const ProjectCard = ({
	title,
	totalTasks,
	tasksCompleted,
	category,
}: Props) => {
	const progress = (tasksCompleted / totalTasks) * 100;

	return (
		<div className="bg-gray-100 dark:bg-muted-foreground/30 p-4 rounded-lg flex flex-col items-start w-full gap-5">
			<div className="flex items-center gap-2 w-full">
				<FaProjectDiagram
					size={24}
					className="bg-primary rounded-full text-white p-1"
				/>
				<h2 className="text-lg font-semibold">{title}</h2>
			</div>
			<div className="flex flex-col items-start w-full gap-2">
				<div className="flex items-center justify-between w-full">
					<div className="text-sm md:text-base flex items-center gap-2">
						<FaBarsProgress className="w-4 md:w-5 h-4 md:h-5 text-gray-500" />
						Progress
					</div>
					<p className="text-sm md:text-base">
						{tasksCompleted}/{totalTasks}
					</p>
				</div>
				<Progress value={progress} />
			</div>
			<div className="flex flex-wrap items-center gap-2 w-full">
				{category.map((cat) => (
					<p
						key={cat}
						className="bg-primary text-white rounded-lg px-4 md:px-6 py-1 text-xs md:text-sm"
					>
						{cat}
					</p>
				))}
			</div>
		</div>
	);
};

export default ProjectCard;
