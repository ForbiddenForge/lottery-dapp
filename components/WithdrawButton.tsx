import { useContractWrite, useContract, Web3Button } from "@thirdweb-dev/react";
import { ethers } from "ethers";

type Props = {
	winnings?: number;
	address?: string;
};

function WithdrawButton(props: Props) {
	const { contract } = useContract(process.env.NEXT_PUBLIC_SMART_CONTRACT);
	const {
		mutate: WithdrawWinnings,
		isLoading,
		error,
	} = useContractWrite(contract, "WithdrawWinnings");
	const smart = process.env.NEXT_PUBLIC_SMART_CONTRACT;

	const withDraw = async () =>
		WithdrawWinnings({
			args: [],
		});

	return (
		<Web3Button
			contractAddress={smart!.toString()}
			// Calls the "setName" function on your smart contract with "My Name" as the first argument
			action={withDraw}
			className="win-btn">
			<p>Winner!!! Winner!!! </p>
			<p>
				{" "}
				Total winnings: {ethers.utils.formatEther(props.winnings.toString())} {""}
				BNB
			</p>
			<br />
			<p>Click here to withdraw</p>
		</Web3Button>
	);
}

export default WithdrawButton;
