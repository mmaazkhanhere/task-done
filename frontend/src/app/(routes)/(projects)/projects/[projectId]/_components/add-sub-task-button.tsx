import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

import { Input } from "@/components/ui/input";

import { IoIosAdd } from "react-icons/io";
import { useToast } from "@/components/ui/use-toast";
import { addSubTask } from "@/actions/subtask_actions/add-subtask";

type Props = {
	taskId: string;
	userId: string;
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

const AddSubTask = ({ taskId, userId }: Props) => {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			priority: "",
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const response = await addSubTask(values, taskId, userId);
		if (response?.status === 200) {
			toast({
				title: "Sub task added successfully",
			});
		} else {
			toast({
				variant: "destructive",
				title: "Something went wrong",
				description: "Failed to add sub task.",
			});
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
				<IoIosAdd className="w-5 h-5" />
				Add Sub Task
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Add Sub task</AlertDialogTitle>
				</AlertDialogHeader>
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
												<SelectValue placeholder="Prioritize your sub task..." />
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
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								aria-label="Add Sub task button"
								type="submit"
								className="w-full dark:text-white"
							>
								Add Subtask
							</AlertDialogAction>
						</AlertDialogFooter>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AddSubTask;
