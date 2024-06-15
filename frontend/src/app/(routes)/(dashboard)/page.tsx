import Image from "next/image";
import React from "react";
import Statistics from "./_components/statistics";
import RightSideBar from "./_components/right-sidebar";

type Props = {};

const MainPage = (props: Props) => {
	return (
		<div className="flex flex-col item-start gap-y-4">
			<div className="flex items-center w-full">
				<div className="w-9/12">
					<Statistics />
				</div>
				<RightSideBar percentage={55} />
			</div>
		</div>
	);
};

export default MainPage;
