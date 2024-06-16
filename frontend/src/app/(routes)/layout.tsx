import React from "react";
import Sidebar from "./_components/sidebar";
import MobileSidebar from "./_components/mobile-sidebar";
import Navbar from "./_components/navbar";

interface Props {
	children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
	return (
		<main className="h-full">
			<header className="md:pl-64 md:h-28 w-full fixed z-50 inset-y-0 ">
				<Navbar />
			</header>
			<section className=" h-full w-64 hidden md:flex flex-col fixed z-50 inset-y-0 dark:border-r dark:border-muted">
				<Sidebar />
			</section>
			<section className="pt-14 md:pt-32 md:pl-[272px] h-full w-full px-4 md:px-0">
				{children}
			</section>
		</main>
	);
};

export default RootLayout;
