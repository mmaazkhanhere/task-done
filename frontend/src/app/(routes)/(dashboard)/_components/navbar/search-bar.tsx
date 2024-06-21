import { Input } from "@/components/ui/input";
import React from "react";
import { IoIosSearch } from "react-icons/io";

type Props = {};

const SearchBar = (props: Props) => {
	return (
		<div className="flex items-center border w-80 px-4 rounded-xl">
			<IoIosSearch className="text-gray-300 w-6 h-6" />
			<Input placeholder="Search ..." className="border-none" />
		</div>
	);
};

export default SearchBar;
