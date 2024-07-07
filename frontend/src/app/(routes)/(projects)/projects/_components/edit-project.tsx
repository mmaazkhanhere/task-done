"use client";

import React, { useCallback, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

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

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";

import {
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
	IoCalendar,
} from "react-icons/io5";

import { Input } from "@/components/ui/input";
import { MdEdit } from "react-icons/md";

import { useToast } from "@/components/ui/use-toast";

import { Category, Project } from "@/types/interface";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { getCategoriesList } from "@/actions/category-actions/get-categories-list";
import { editProject } from "@/actions/project-actions/edit-project";

type Props = {
	project: Project;
	fetchProjectList: () => void;
	userId: string;
};

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

const formSchema = z.object({
	title: z
		.string()
		.min(2, {
			message: "Project title must be at least 2 characters.",
		})
		.max(40, {
			message: "Project title must be less than 50 characters.",
		}),

	description: z
		.string()
		.min(2, {
			message: "Project description must be at least 2 characters.",
		})
		.max(200, {
			message: "Project description must be less than 200 characters.",
		}),

	due_date: z.date({
		required_error: "A date of birth is required.",
	}),

	category_id: z.string().min(1),

	icon: z.string().min(1, {
		message: "Please select an icon.",
	}),
});

const EditProject = ({ project, userId, fetchProjectList }: Props) => {
	const [selectedIcon, setSelectedIcon] = useState(project.icon);
	const [categories, setCategories] = useState<Category[]>([]);

	const { toast } = useToast();

	const getCategories = useCallback(async () => {
		try {
			const responseData = await getCategoriesList(userId as string);
			setCategories(responseData);
		} catch (error) {
			console.error(`[CATEGORIES_FETCH_CALLBACK_ERROR]: `, error);
		}
	}, [userId]);

	useEffect(() => {
		getCategories();
	}, [getCategories]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: project.title,
			description: project.description,
			icon: project.icon,
			category_id: project.category_id,
			due_date: project.due_date,
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const handleIconChange = (iconName: string) => {
		setSelectedIcon(iconName);
		form.setValue("icon", iconName);
	};

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await editProject(
				values,
				project.id,
				userId as string
			);
			if (response?.status == 200) {
				toast({
					title: "Project Edited Successfully",
				});
				fetchProjectList();
			}
		} catch (error) {
			toast({
				title: "Something went wrong",
				variant: "destructive",
				description: "Error editing project",
			});
		}
	}

	return (
		<Dialog>
			<DialogTrigger className="flex items-center justify-center gap-2 w-full">
				<MdEdit />
				Edit
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="pb-2">Edit Project</DialogTitle>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<div className="flex flex-wrap items-end gap-4">
								{/*title field */}
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
													maxLength={40}
													{...field}
													onClick={(e) =>
														e.stopPropagation()
													}
													onKeyDown={(e) =>
														e.keyCode === 32
															? e.stopPropagation()
															: null
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/*icon field */}
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
															{icons.map(
																(icon) => (
																	<button
																		key={
																			icon.name
																		}
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
																)
															)}
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

							{/*date field */}
							<FormField
								control={form.control}
								name="due_date"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Due Date</FormLabel>
										<Popover modal={true}>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"w-[240px] pl-3 text-left font-normal",
															!field.value &&
																"text-muted-foreground"
														)}
													>
														{field.value ? (
															format(
																field.value,
																"PPP"
															)
														) : (
															<span>
																Pick a date
															</span>
														)}
														<IoCalendar className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto p-0"
												align="start"
											>
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date < new Date()
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/*description field */}
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="The project is about..."
												className="min-h-[140px]"
												maxLength={200}
												{...field}
												onClick={(e) =>
													e.stopPropagation()
												}
												onKeyDown={(e) =>
													e.keyCode === 32
														? e.stopPropagation()
														: null
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/*category field */}
							<FormField
								control={form.control}
								name="category_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Select Category</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a cateogry" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{categories.map((category) => (
													<SelectItem
														key={category.id}
														value={category.id}
													>
														{category.title}
													</SelectItem>
												))}
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

export default EditProject;
