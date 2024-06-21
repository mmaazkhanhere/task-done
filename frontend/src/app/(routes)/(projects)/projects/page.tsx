import React from "react";
import ProjectNavbar from "./_components/project-navbar";
import Topbar from "./_components/top-bar";

type Props = {};

const Projects = (props: Props) => {
	return (
		<div className="relative w-full">
			<ProjectNavbar />
			<Topbar />
		</div>
	);
};

export default Projects;
