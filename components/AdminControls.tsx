import {
	ArrowPathIcon,
	ArrowUturnDownIcon,
	CurrencyDollarIcon,
	StarIcon,
} from "@heroicons/react/24/solid";
import { Web3Button, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React from "react";
import { toast } from "react-hot-toast";

function AdminControls() {
	const { contract } = useContract<string>(process.env.NEXT_PUBLIC_SMART_CONTRACT);

	const { data: totalCommission } = useContractRead(contract, "operatorTotalCommission");
	const {
		mutate: WithdrawCommission,
		isLoading,
		error,
	} = useContractWrite(contract, "WithdrawCommission");
	const { mutate: DrawWinnerTicket } = useContractWrite(contract, "DrawWinnerTicket");
	const { mutate: restartDraw } = useContractWrite(contract, "restartDraw");
	const { mutate: RefundAll } = useContractWrite(contract, "RefundAll");

	const handleAction = async () => {
		const notify = toast.loading("Withdrawing your commission...");
		try {
			await WithdrawCommission({
				args: [],
				overrides: {},
			});
			toast.success("Commission successfully withdrawn!", { id: notify });
		} catch (error) {
			toast.error(
				"Oopsies! Something went wrong⚠️ Please check you are using the correct wallet and Chain",
				{ id: notify }
			);
			console.log("Contract call faliure.", error);
		}
	};

	const handleDraw = async () => {
		const notify = toast.loading("Choosing a winner...");
		try {
			await DrawWinnerTicket({
				args: [],
				overrides: {},
			});
			toast.success("Draw has been completed", { id: notify });
		} catch (error) {
			toast.error(
				"Oopsies! Something went wrong⚠️ Please check you are using the correct wallet and Chain",
				{ id: notify }
			);
			console.log("Contract call faliure.", error);
		}
	};

	const handleRestart = async () => {
		const notify = toast.loading("Restarting the lottery...");
		try {
			await restartDraw({
				args: [],
				overrides: {},
			});
			toast.success("Lottery has restarted!", { id: notify });
		} catch (error) {
			toast.error(
				"Oopsies! Something went wrong⚠️ Please check you are using the correct wallet and Chain",
				{ id: notify }
			);
			console.log("Contract call faliure.", error);
		}
	};

	const handleReFundAll = async () => {
		const notify = toast.loading("Refunding all participants...");
		try {
			await RefundAll({
				args: [],
				overrides: {},
			});
			toast.success("All participants have been refunded!", { id: notify });
		} catch (error) {
			toast.error(
				"Oopsies! Something went wrong⚠️ Please check you are using the correct wallet and Chain",
				{ id: notify }
			);
			console.log("Contract call faliure.", error);
		}
	};

	return (
		<div className="text-white text-center px-5 py-3 rounded-md border">
			<h2 className="font-bold">Admin Controls</h2>
			<p className="mb-5">
				Total Commission to be withdrawn:{" "}
				{totalCommission && ethers.utils.formatEther(totalCommission.toString())} BNB
			</p>
			<div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
				<Web3Button
					contractAddress={process.env.NEXT_PUBLIC_SMART_CONTRACT!.toString()}
					action={handleDraw}
					className="admin-btn">
					{" "}
					<StarIcon className="h-6 mx-auto mb-2" /> Draw Winner
				</Web3Button>

				<Web3Button
					contractAddress={process.env.NEXT_PUBLIC_SMART_CONTRACT!.toString()}
					action={handleAction}
					className="admin-btn">
					{" "}
					<CurrencyDollarIcon className="h-6 mx-auto mb-2" />
					Withdraw Commision
				</Web3Button>

				<Web3Button
					contractAddress={process.env.NEXT_PUBLIC_SMART_CONTRACT!.toString()}
					action={handleRestart}
					className="admin-btn">
					{" "}
					<ArrowPathIcon className="h-6 mx-auto mb-2" />
					Restart Draw
				</Web3Button>
				<Web3Button
					contractAddress={process.env.NEXT_PUBLIC_SMART_CONTRACT!.toString()}
					action={handleReFundAll}
					className="admin-btn">
					{" "}
					<ArrowUturnDownIcon className="h-6 mx-auto mb-2" />
					Refund All
				</Web3Button>
			</div>
		</div>
	);
}

export default AdminControls;
