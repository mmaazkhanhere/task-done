import React from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { IoIosAdd } from "react-icons/io";

type Props = {};

const AddSubTask = (props: Props) => {
	return (
		<Dialog>
			<DialogTrigger className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
				<IoIosAdd className="w-5 h-5" />
				Add Sub Task
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently
						delete your account and remove your data from our
						servers.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default AddSubTask;
