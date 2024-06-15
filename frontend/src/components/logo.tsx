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
				width={150}
				height={150}
				className="hover:animate-pulse"
			/>
		</Link>
	);
};

export default Logo;
