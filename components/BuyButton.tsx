import { useContractWrite, useContract, Web3Button, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

type Props = {
	remainingTickets?: number;
	quantity?: number;
	noOfUserTickets?: number;
};

function BuyButton(props: Props) {
	const { contract } = useContract(process.env.NEXT_PUBLIC_SMART_CONTRACT);
	const { mutateAsync, isLoading, error } = useContractWrite(contract, "BuyTickets");
	const { data: ticketPrice } = useContractRead(contract, "ticketPrice");
	const { data: expiration } = useContractRead(contract, "expiration");
	const { data: remainingTickets } = useContractRead(contract, "RemainingTickets");
	const smart = process.env.NEXT_PUBLIC_SMART_CONTRACT;

	const disabled =
		expiration?.toString() < Date.now().toString() ||
		parseInt(remainingTickets) === 0 ||
		props.noOfUserTickets === 5 ||
		props.quantity > 5;

	const buyTicket = async () => {
		if (disabled) {
			toast.error("You have reached the maximum number of tickets!");
		}
		if (!ticketPrice) return;
		const notify = toast.loading("Buying your tickets...🎫");
		try {
			await mutateAsync({
				args: [],
				overrides: {
					gasLimit: 1000000, // override default gas limit
					value: ethers.utils.parseEther(
						(Number(ethers.utils.formatEther(ticketPrice)) * props.quantity).toString()
					),
				},
			});
			toast.success("Tickets were successfully purchased✅", { id: notify });
			console.log("payment successful, tickets remaining:", remainingTickets);
		} catch (error) {
			toast.error(
				"Oopsies! Something went wrong⚠️ Please ensure that you are using the correct wallet and on BNB Chain",
				{ id: notify }
			);
			console.log("Contract call faliure.", error);
		}
	};

	return (
		<Web3Button
			contractAddress={smart!.toString()}
			action={buyTicket}
			isDisabled={disabled}
			className="buy-btn">
			{!disabled &&
				`Buy ${props.quantity} ticket${props.quantity > 1 ? "s" : ""} for ${
					ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString())) * props.quantity
				} BNB`}
			{disabled &&
				`Tickets Sales Currently Closed ${(
					<br />
				)}or You've attemped to purchase more than 5 tickets.`}
		</Web3Button>
	);
}

export default BuyButton;
