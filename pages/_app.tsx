"use client";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";
import { Binance } from "@thirdweb-dev/chains";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThirdwebProvider activeChain={Binance} clientId={"6c8807106e8ce26d29f3fed938b934a2"}>
			<Component {...pageProps} />
			<Toaster />
		</ThirdwebProvider>
	);
}

function Component() {
	const { contract, isLoading } = useContract("0xC07EA1c6BbB14088Fcab9D4D49A2023f2d455191");
}
