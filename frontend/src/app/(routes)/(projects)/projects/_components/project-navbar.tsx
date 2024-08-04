import React from "react";

import MobileSidebar from "@/app/(routes)/_components/mobile-sidebar";
import AddProject from "./add-project";

import { Project } from "@/types/interface";

type Props = {
	projectList: Project[];
	fetchProjectList: () => void;
};

const ProjectNavbar = ({ projectList, fetchProjectList }: Props) => {
	if (projectList === null) {
		console.log(null);
	}

	return (
		<header className="sticky top-0 left-0 w-full flex items-center gap-4 md:gap-0 justify-between z-50 bg-white dark:bg-muted py-3 md:py-4 px-4 shadow-sm">
			<div className="md:hidden">
				<MobileSidebar />
			</div>
			<div className="flex items-center justify-center gap-4 lg:gap-8">
				<div className="flex flex-col items-start">
					<h2 className="text-lg md:text-xl font-bold">Projects</h2>
					{projectList !== null && (
						<p className="text-gray-400 text-xs md:text-sm">
							{projectList.length} Projects
						</p>
					)}
				</div>
				<AddProject fetchProjectList={fetchProjectList} />
			</div>
		</header>
	);
};

export default ProjectNavbar;
