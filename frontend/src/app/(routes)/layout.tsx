import React from "react";
import Sidebar from "./_components/sidebar";

interface Props {
	children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
	return (
		<main className="h-full">
			<section className=" h-full w-64 hidden md:flex flex-col fixed z-50 inset-y-0 dark:border-r dark:border-muted">
				<Sidebar />
			</section>
			<section className="md:pl-64 h-full w-full px-4 md:px-0">
				{children}
			</section>
		</main>
	);
};

export default RootLayout;
