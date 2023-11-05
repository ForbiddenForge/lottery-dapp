import React from "react";
import { ConnectWallet, Web3Button, useMetamask, darkTheme } from "@thirdweb-dev/react";

function Login() {
	const connectWithMetamask = useMetamask();

	return (
		<div className="bg-[#481422] min-h-screen flex flex-col items-center justify-center">
			<div className="flex flex-col items-center mb-5 mt-10 text-center">
				<h1 className="text-6xl text-white font-bold mb-10">The Dragon Lottery</h1>
				<h2 className="text-white mb-1">Get started by logging in with your Metamask</h2>
				<div className="flex flex-row justify-center space-x-5 mb-5">
					<a
						className="mt-5 bg-[#7e233d] px-10 py-5 rounded-md text-white shadow-xl !important; hover:animate-pulse"
						href="https://dragon-bsc.vip">
						Home
					</a>
					<Web3Button
						theme={darkTheme({
							fontFamily: "Inter, sans-serif",
							colors: {
								modalBg: "#000000",
								accentText: "red",
							},
						})}
						connectWallet={{ btnTitle: "Connect Wallet", modalTitle: "Login" }}
						contractAddress="0xC07EA1c6BbB14088Fcab9D4D49A2023f2d455191"
						action={(contract) => console.log(contract)}
						className="connect-btn">
						Login with Metamask
					</Web3Button>
				</div>
				<img className="rounded-full h-100 w-300 mb-10" src="lotter-on-sale.jpg" alt="" />
			</div>
		</div>
	);
}

export default Login;
