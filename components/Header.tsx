import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import NavButton from "./NavButton";
import React from "react";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import { redirect } from "next/dist/server/api-utils";

export default function Header() {
	const address = useAddress();
	const disconnect = useDisconnect();

	return (
		<header className="grid grid-cols-2 md:grid-cols-5  justify-between items-center p-5">
			<div className="flex items-center space-x-2">
				<img className="rounded-full h-20 w-20" src="Logo-circle-transparent-bg.png" alt="" />

				<div>
					<h1 className="text-lg text-white font-bold">The Dragon Lottery</h1>
					<p className="test-xs text-emerald-500 truncate">
						User: {address?.substring(0, 5)}...
						{address?.substring(address.length - 5, address.length)}
					</p>
				</div>
			</div>

			<div className="hidden md:flex md:col-span-3 items-center justify-center rounded-md">
				<div className="bg-[#2f0d16] p-4 space-x-2">
					<a
						className="hover:bg-[#7e233d] text-white py-2 px-4 rounded font-bold"
						href="https://dragon-bsc.vip">
						Home
					</a>
					<NavButton title="Buy Tickets" isActive />
					<NavButton onClick={disconnect} title="Logout" />
				</div>
			</div>

			<div className="flex flex-col ml-auto text-right">
				<Bars3BottomRightIcon className="h-8 w-8 mx-auto text-white cursor-pointer" />
				<span className="md:hidden">
					<NavButton onClick={disconnect} title="Logout" />
				</span>
				<span className="md:hidden">
					<a
						className="hover:bg-[#7e233d] text-white py-2 px-4 rounded font-bold"
						href="https://dragon-bsc.vip">
						Home
					</a>
				</span>
			</div>
		</header>
	);
}
