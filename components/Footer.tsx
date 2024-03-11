import React from 'react';
const currentYear = new Date().getFullYear();
function Footer() {
	return (
		<footer className=" z-10 border-t border-[#78273d] bg-[#2f0d16] flex items-center text-white justify-between p-5 fixed bottom-0 left-0 w-full">
			<img
				src="/Logo-circle-transparent-bg.png"
				alt="logo"
				className="w-10 h-10 rounded-full "
				width={50}
				height={50}
			/>
			<a
				className="text-decoration-none bg-red-600 text-lg py-2 px-6 rounded-full animate-bounce"
				href="https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=0x2E5BC438539d0f68667570946a8Fe0e938Bc2261">
				BUY $DRGN3D
			</a>
			<p className="text-xs text-white pl-5">{currentYear} </p>
		</footer>
	);
}

export default Footer;
