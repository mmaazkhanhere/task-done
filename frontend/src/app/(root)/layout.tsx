import React from "react";
import Sidebar from "./_components/sidebar";
import MobileSidebar from "./_components/mobile-sidebar";

interface Props {
	children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
	return (
		<main className="h-full">
			<header className="md:hidden py-4 px-2">
				<MobileSidebar />
			</header>
			<section className=" h-full w-64 hidden md:flex flex-col fixed z-50 inset-y-0 shadow-md dark:border-r dark:border-muted">
				<Sidebar />
			</section>
			<section className="md:pl-64 px-2">{children}</section>
		</main>
	);
};

export default RootLayout;
