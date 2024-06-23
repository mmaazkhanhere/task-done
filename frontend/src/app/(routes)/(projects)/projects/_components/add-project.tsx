"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import MultipleSelector from "@/components/multiple-selector";

import { Button } from "@/components/ui/button";

import {
	IoAdd,
	IoAirplane,
	IoCafe,
	IoCar,
	IoFitness,
	IoFootball,
	IoGlobe,
	IoHeart,
	IoHome,
	IoLaptop,
	IoMusicalNote,
	IoBody,
	IoBusiness,
	IoSchool,
	IoBook,
	IoCode,
	IoGameController,
} from "react-icons/io5";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { Option } from "@/components/multiple-selector";

type Props = {};

const icons = [
	{ name: "Personal", component: IoBody },
	{ name: "Business", component: IoBusiness },
	{ name: "School", component: IoSchool },
	{ name: "Travel", component: IoAirplane },
	{ name: "Cafe", component: IoCafe },
	{ name: "Transport", component: IoCar },
	{ name: "Fitness", component: IoFitness },
	{ name: "Sports", component: IoFootball },
	{ name: "Global", component: IoGlobe },
	{ name: "Health", component: IoHeart },
	{ name: "Home", component: IoHome },
	{ name: "Tech", component: IoLaptop },
	{ name: "Music", component: IoMusicalNote },
	{ name: "Book", component: IoBook },
	{ name: "Code", component: IoCode },
	{ name: "Gaming", component: IoGameController },
];

const OPTIONS: Option[] = [
	{ label: "Personal", value: "personal" },
	{ label: "Work", value: "work" },
	{ label: "School", value: "remix" },
];

const optionSchema = z.object({
	label: z.string(),
	value: z.string(),
	disable: z.boolean().optional(),
});

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Project title must be at least 2 characters.",
	}),
	category: z.array(optionSchema),
	icon: z.string().min(1, {
		message: "Please select an icon.",
	}),
});

const AddProject = (props: Props) => {
	const [selectedIcon, setSelectedIcon] = useState("Personal");

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			icon: "Personal",
		},
	});

	const handleIconChange = (iconName: string) => {
		setSelectedIcon(iconName);
		form.setValue("icon", iconName);
	};

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
					Add Project
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Add New Project</AlertDialogTitle>
				</AlertDialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
					>
						<div className="flex flex-wrap items-end gap-4">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Project Title</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter a name for your project..."
												className=" w-96"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="icon"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button
														size="sm"
														className="dark:text-white"
													>
														{React.createElement(
															icons.find(
																(icon) =>
																	icon.name ===
																	selectedIcon
															)?.component ||
																IoBody,
															{
																size: 24,
															}
														)}
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Select an icon
														</AlertDialogTitle>
													</AlertDialogHeader>
													<div className="grid p-4 grid-cols-8 gap-4">
														{icons.map((icon) => (
															<button
																key={icon.name}
																type="button"
																onClick={() =>
																	handleIconChange(
																		icon.name
																	)
																}
																title={
																	icon.name
																}
																className={cn(
																	"p-1 w-10 h-10 flex justify-center items-center border rounded-lg",
																	selectedIcon ==
																		icon.name
																		? "bg-primary text-white"
																		: "dark:bg-muted"
																)}
															>
																{React.createElement(
																	icon.component,
																	{
																		size: 20,
																	}
																)}
															</button>
														))}
													</div>
													<AlertDialogFooter>
														<AlertDialogCancel>
															Cancel
														</AlertDialogCancel>
														<AlertDialogAction>
															Continue
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<MultipleSelector
											defaultOptions={OPTIONS}
											{...field}
											placeholder="Select category..."
											emptyIndicator={
												<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
													no results found.
												</p>
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								aria-label="Add project button"
								type="submit"
								className="w-full dark:text-white"
							>
								Add Project
							</AlertDialogAction>
						</AlertDialogFooter>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AddProject;
