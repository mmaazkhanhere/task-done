"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { IoIosAdd } from "react-icons/io";

type Props = {};

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Category title must be at least 2 characters.",
	}),
});
const AddCategory = (props: Props) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
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
