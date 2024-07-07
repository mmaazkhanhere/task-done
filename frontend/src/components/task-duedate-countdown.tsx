import { calculateTimeLeft } from "@/helper/calculate-time-left";
import React, { useEffect, useState, useMemo } from "react";

type Props = {
	dueDate: Date;
};

const TaskDueDateCountdown = ({ dueDate }: Props) => {
	const [timeLeft, setTimeLeft] = useState("");

	const timeLeftMemoized = useMemo(
		() => calculateTimeLeft(dueDate),
		[dueDate]
	);

	useEffect(() => {
		const timer = setInterval(() => {
			const newTimeLeft = calculateTimeLeft(dueDate);
			if (newTimeLeft !== timeLeftMemoized) {
				setTimeLeft(newTimeLeft);
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [dueDate, timeLeftMemoized]);

	return <div>{<p>{timeLeft || "Overdue!"}</p>}</div>;
};

export default TaskDueDateCountdown;
