import React from "react";

import Navbar from "./_components/navbar/navbar";
import Statistics from "./_components/statistics";
import RightSideBar from "./_components/right-sidebar/right-sidebar";
import ProgressBarChart from "./_components/progress-bar-chart";
import RecentTasks from "./_components/recent-tasks";

type Props = {};

const MainPage = (props: Props) => {
	return (
		<section className="w-full relatives">
			<header className="w-full sticky z-50 top-0 left-0 bg-white dark:bg-muted">
				<Navbar />
			</header>

			<div className="flex flex-col items-center lg:item-start gap-y-4 w-full py-4">
				<div className="flex flex-col lg:flex-row w-full p-2 md:p-0">
					<div className="w-full lg:w-9/12 flex flex-col gap-y-8 lg:gap-y-4">
						<Statistics />
						<ProgressBarChart />
						<RecentTasks />
					</div>
					<RightSideBar />
				</div>
			</div>
		</section>
	);
};

export default MainPage;
