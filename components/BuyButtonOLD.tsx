import {
	SmartContract,
	Web3Button,
	useContract,
	useContractRead,
	useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React from "react";
import { toast } from "react-hot-toast";

function BuyButtonOld(props: { quantity: number }) {
	const { contract } = useContract(process.env.NEXT_PUBLIC_SMART_CONTRACT);
	const { data: ticketPrice } = useContractRead(contract, "ticketPrice");
	const { data: expiration } = useContractRead(contract, "expiration");
	const { data: remainingTickets } = useContractRead(contract, "RemainingTickets");
	const smart = process.env.NEXT_PUBLIC_SMART_CONTRACT;

	const handleAction = async (contract: SmartContract<ethers.BaseContract>) => {
		if (!ticketPrice) return;
		const notify = toast.loading("Buying your tickets... 🎫");
		try {
			const data = await contract.call("BuyTickets", [], {
				value: ethers.utils.parseEther(
					(Number(ethers.utils.formatEther(ticketPrice)) * props.quantity).toString()
				),
			});
			toast.success("Tickets were successfully purchased", { id: notify });
			console.log("payment successful", data);
		} catch (error) {
			toast.error("Oopsies, something went wrong!!!", { id: notify });
			console.error("contract call faliure", error);
		}
	};

	const disabled =
		expiration?.toString() < Date.now().toString() || parseInt(remainingTickets) === 0;

	return (
		<div className="">
			<Web3Button
				contractAddress={smart!.toString()}
				action={handleAction}
				className="buy-btn"
				isDisabled={disabled}>
				{`Buy ${props.quantity} ticket${props.quantity > 1 ? "s" : ""} for ${
					ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString())) * props.quantity
				} BNB`}
			</Web3Button>
		</div>
	);
}

export default BuyButtonOld;
