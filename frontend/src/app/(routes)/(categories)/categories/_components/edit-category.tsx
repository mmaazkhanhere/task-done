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
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { editCategory } from "@/actions/edit-category";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
	categoryId: string;
	fetchCategoriesList: () => void;
};

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Category title must be at least 2 characters.",
	}),
});
const EditCategory = ({ categoryId, fetchCategoriesList }: Props) => {
	const { userId } = useAuth();
	const { toast } = useToast();
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
		console.log(values);
		try {
			console.log("try");
			const response = await editCategory(
				categoryId,
				userId as string,
				values.title
			);
			if (response?.status === 200) {
				toast({
					title: "Category Edit Successful",
				});
				form.reset();
				fetchCategoriesList();
				router.refresh();
			} else {
				toast({
					title: "Something went wrong",
					description: "Failed to edit category",
					variant: "destructive",
				});
			}
		} catch (error) {
			console.error("[EDIT-CATEOGRY-ERROR]: ", error);
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
					<DialogTitle className="pb-2">Edit Category</DialogTitle>
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
										<FormLabel>
											Edit Category Title
										</FormLabel>
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

export default EditCategory;
