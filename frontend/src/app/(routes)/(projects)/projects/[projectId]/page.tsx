import React from "react";
import ProjectDetailNavbar from "./_components/project-detail-navbar";
import ProjectDetailsTopBar from "./_components/project-details-topbar";

type Props = {};

const ProjectDetailPage = (props: Props) => {
	return (
		<div className="relative w-full">
			<ProjectDetailNavbar />
			<ProjectDetailsTopBar />
		</div>
	);
};

export default ProjectDetailPage;
