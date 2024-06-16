import React from "react";
import OverallProgress from "./overall-progress";
import LatestProjects from "./latest-projects";

type Props = {};

const RightSideBar = (props: Props) => {
	return (
		<div className="w-3/12 p-4 flex flex-col gap-4">
			<OverallProgress percentage={30} />
			<LatestProjects />
		</div>
	);
};

export default RightSideBar;
