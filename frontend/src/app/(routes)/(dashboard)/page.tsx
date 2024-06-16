import Image from "next/image";
import React from "react";
import Statistics from "./_components/statistics";
import RightSideBar from "./_components/right-sidebar";
import ProgressLineChart from "./_components/progress-line-chart";

type Props = {};

const MainPage = (props: Props) => {
	return (
		<div className="flex flex-col item-start gap-y-4">
			<div className="flex w-full">
				<div className="w-9/12">
					<Statistics />
					<ProgressLineChart />
				</div>
				<RightSideBar />
			</div>
		</div>
	);
};

export default MainPage;
