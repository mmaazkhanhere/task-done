"use client";

import React, { useState } from "react";
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

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IoAdd } from "react-icons/io5";

type Props = {
	projectId: string;
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

const AddProjectTask = ({ projectId, userId }: Props) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			priority: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					size="sm"
					className="flex items-center justify-center gap-1 text-xs md:text-sm dark:text-white"
				>
					<IoAdd size={24} className="hidden md:block" />
					Add Task
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Add New Task</AlertDialogTitle>
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
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								aria-label="Add Task button"
								type="submit"
								className="w-full dark:text-white"
							>
								Add Task
							</AlertDialogAction>
						</AlertDialogFooter>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AddProjectTask;
