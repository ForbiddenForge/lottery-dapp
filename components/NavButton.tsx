import React from "react";

type Props = {
	title?: string;
	isActive?: boolean;
	onClick?: () => void;
};

export default function NavButton(props: Props) {
	return (
		<button
			onClick={props.onClick}
			className={`${
				props.isActive && "bg-[#7e233d]"
			} hover:bg-[#7e233d] text-white py-2 px-4 rounded font-bold`}>
			{props.title}
		</button>
	);
}
