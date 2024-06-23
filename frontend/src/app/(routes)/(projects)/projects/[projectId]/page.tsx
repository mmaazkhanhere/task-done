import React from "react";
import ProjectDetailNavbar from "./_components/project-detail-navbar";
import ProjectDetailsTopBar from "./_components/project-details-topbar";
import ProjectTasksList from "./_components/project-tasks-list";

type Props = {};

const ProjectDetailPage = (props: Props) => {
	return (
		<div className="relative w-full">
			<ProjectDetailNavbar />
			<ProjectDetailsTopBar />
			<ProjectTasksList />
		</div>
	);
};

export default ProjectDetailPage;
