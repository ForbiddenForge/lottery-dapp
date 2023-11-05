import React from "react";
import { PacmanLoader } from "react-spinners";

function Loading() {
	return (
		<div className="bg-[#481422] h-screen flex flex-col items-center justify-center">
			<div className="flex items-center space-x-2 mb-10">
				<img className="rounded-full h-20 w-20" src="Logo-circle-transparent-bg.png" alt="" />
				<h1 className="text-lg text-white font-bold">Loading</h1>
			</div>
			<PacmanLoader size={50} color="#ff30a6" className="mr-20" />
		</div>
	);
}

export default Loading;
