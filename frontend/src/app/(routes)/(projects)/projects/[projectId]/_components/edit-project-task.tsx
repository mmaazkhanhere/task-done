import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Task } from "@/types/interface";
import { MdEdit } from "react-icons/md";
import { editProjectTask } from "@/actions/project-task-actions/edit-project-task";

type Props = {
	userId: string;
	task: Task;
	getProjectData: () => void;
	getTaskList: () => void;
};

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Task title must be at least 2 characters.",
	}),
	due_date: z.date(),
	priority: z.string().min(1, {
		message: "Please assign priority.",
	}),
});

const EditProjectTask = ({
	task,
	userId,
	getProjectData,
	getTaskList,
}: Props) => {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: task.title,
			due_date: task.due_date,
			priority: task.priority,
		},
	});
	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const response = await editProjectTask(task.id, userId, values);
		if (response?.status == 200) {
			toast({
				title: "Task updated successfully",
			});
			getProjectData();
			getTaskList();
		} else {
			toast({
				variant: "destructive",
				title: "Something went wrong",
				description: "Cannot update the task",
			});
		}
	};

	return (
		<Dialog>
			<DialogTrigger className="flex items-center justify-center gap-2 w-full">
				<MdEdit />
				Edit
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Task</DialogTitle>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input
												placeholder="What you want to do..."
												onClick={(e) =>
													e.stopPropagation()
												}
												onKeyDown={(e) =>
													e.keyCode === 32
														? e.stopPropagation()
														: null
												}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="due_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Due Date</FormLabel>
										<DateTimePicker
											value={field.value}
											onChange={(value) =>
												field.onChange(value)
											}
											minDate={new Date()}
											className="ml-4"
										/>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="priority"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Priority</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Prioritize your task..." />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="High">
													High
												</SelectItem>
												<SelectItem value="Medium">
													Medium
												</SelectItem>
												<SelectItem value="Low">
													Low
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								aria-label="Edit category button"
								className="w-full"
								type="submit"
								disabled={isValid && isSubmitting}
							>
								Edit Category
							</Button>
						</form>
					</Form>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default EditProjectTask;
