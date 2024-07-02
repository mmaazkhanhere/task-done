"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@clerk/nextjs";

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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { add_category } from "@/actions/category-actions/add-category";

import { IoIosAdd } from "react-icons/io";

type Props = {
	fetchCategoriesList: () => void;
};

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Category title must be at least 2 characters.",
	}),
});
const AddCategory = ({ fetchCategoriesList }: Props) => {
	const { toast } = useToast();
	const { userId } = useAuth();
	const router = useRouter();

	if (!userId) {
		throw new Error("No authorized!");
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	const { isSubmitting, isValid } = form.formState;

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await add_category(values.title, userId as string);

			if (response?.status == 200) {
				toast({
					title: "Success",
					description: "Category created.",
				});
			} else if (response?.message.includes("409")) {
				toast({
					title: "Category already exists",
					variant: "destructive",
				});
			} else {
				toast({
					title: "Something went wrong",
					description: "Failed to create category.",
					variant: "destructive",
				});
			}
			fetchCategoriesList();
			router.refresh();
		} catch (error: any) {
			console.log("[CATEGORY_CREATE_API_ERROR]: ", error);
		}
	}

	return (
		<Dialog>
			<DialogTrigger className="flex items-center justify-center gap-2 w-full bg-primary text-white p-2 rounded-lg text-sm">
				<IoIosAdd className="w-5 h-5 hidden md:block" />
				Add Category
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="pb-2">Add New Category</DialogTitle>
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
										<FormLabel>Category Title</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter category title..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								aria-label="Add category button"
								className="w-full"
								type="submit"
								disabled={isValid && isSubmitting}
							>
								Add Category
							</Button>
						</form>
					</Form>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default AddCategory;
