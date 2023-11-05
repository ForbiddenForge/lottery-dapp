import React from "react";
import { ConnectWallet, Web3Button, useMetamask, darkTheme } from "@thirdweb-dev/react";

function Login() {
	const connectWithMetamask = useMetamask();

	return (
		<div className="bg-[#481422] min-h-screen flex flex-col items-center justify-center">
			<div className="flex flex-col items-center mb-10 text-center">
				<a
					className="bg-[#7e233d] text-white py-3 px-5 mb-5 mt-5 rounded font-bold hover:animate-pulse"
					href="https://dragon-bsc.vip">
					Home
				</a>
				<img className="rounded-full h-100 w-300 mb-10" src="lotter-on-sale.jpg" alt="" />
				<h1 className="text-6xl text-white font-bold mb-10">The Dragon Lottery</h1>
				<h2 className="text-white mb-5">Get started by logging in with your Metamask</h2>
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
		</div>
	);
}

export default Login;
