import Image from "next/image";
import React from "react";

type Props = {};

const MainPage = (props: Props) => {
	return <Image src="/assets/logo.png" alt="Logo" width={100} height={100} />;
};

export default MainPage;
