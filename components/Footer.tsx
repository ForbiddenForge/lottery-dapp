import Image from "next/image";
import React from "react";
const currentYear = new Date().getFullYear();
function Footer() {
	return (
		<footer className=" z-10 border-t border-[#78273d] bg-[#2f0d16] flex items-center text-white justify-between p-5 fixed bottom-0 left-0 w-full">
			<Image
				src="/logo-circle-transparent-bg.png"
				alt="logo"
				className="w-10 h-10 rounded-full "
				width={50}
				height={50}
			/>
			<a
				className="text-decoration-none hover:text-red-500"
				href="https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x73E6Fa4A8a4d5F44b25443013e9d04dA7457e0dC">
				BUY $DRAGON
			</a>
			<p className="text-xs text-white pl-5">{currentYear} </p>
		</footer>
	);
}

export default Footer;
