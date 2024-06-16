import React from "react";

import Statistics from "./_components/statistics";
import RightSideBar from "./_components/right-sidebar/right-sidebar";
import ProgressBarChart from "./_components/progress-bar-chart";
import RecentTasks from "./_components/recent-tasks";

type Props = {};

const MainPage = (props: Props) => {
	return (
		<div className="flex flex-col items-center lg:item-start gap-y-4 w-full">
			<div className="flex flex-col lg:flex-row w-full">
				<div className="w-full lg:w-9/12 flex flex-col gap-y-8 lg:gap-y-4">
					<Statistics />
					<ProgressBarChart />
					<RecentTasks />
				</div>
				<RightSideBar />
			</div>
		</div>
	);
};

export default MainPage;
