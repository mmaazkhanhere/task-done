import React from "react";

interface Props {
	children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
	return <div>{children}</div>;
};

export default RootLayout;
