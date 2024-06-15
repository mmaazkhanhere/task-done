import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
	return (
		<Link href="/">
			<Image
				src="/assets/logo.png"
				alt="Logo"
				width={180}
				height={180}
				className="hover:animate-pulse"
			/>
		</Link>
	);
};

export default Logo;
