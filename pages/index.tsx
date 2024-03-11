import type { NextPage } from 'next';
import React from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import Login from '@/components/Login';
import CountdownTimer from '@/components/CountdownTimer';
import BuyButton from '@/components/BuyButton';
import WithdrawButton from '@/components/WithdrawButton';
import Footer from '@/components/Footer';
import AdminControls from '@/components/AdminControls';
import {
	useContract,
	useMetamask,
	useDisconnect,
	useAddress,
	useContractRead,
	useContractWrite,
	Web3Button,
} from '@thirdweb-dev/react';
import { ethers, BigNumber } from 'ethers';
import toast from 'react-hot-toast';
import Marquee from 'react-fast-marquee';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = () => {
	const address = useAddress();
	const [userTickets, setUserTickets] = React.useState<number>(0);
	const [quantity, setQuantity] = React.useState<number>(1);
	const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_SMART_CONTRACT);
	const { data: expiration } = useContractRead(contract, 'expiration');
	const { data: remainingTickets } = useContractRead(contract, 'RemainingTickets');
	const { data: currentWinningReward } = useContractRead(contract, 'CurrentWinningReward');
	const { data: ticketPrice } = useContractRead(contract, 'ticketPrice');
	const { data: ticketCommission } = useContractRead(contract, 'ticketCommission');
	const { data: getTickets } = useContractRead(contract, 'getTickets');
	const { data: winnings } = useContractRead(contract, 'getWinningsForAddress', [address]);
	const { data: lastWinner } = useContractRead(contract, 'lastWinner');
	const { data: lastWinnerAmount } = useContractRead(contract, 'lastWinnerAmount');
	const { data: lotteryOperator } = useContractRead(contract, 'lotteryOperator');

	React.useEffect(() => {
		if (!getTickets) return;
		const totalTickets: string[] = getTickets;

		const noOfUserTickets: number = totalTickets.reduce(
			(total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
			0
		);
		setUserTickets(noOfUserTickets);
	}, [address, getTickets]);

	// if (isLoading) return <Loading />;

	// if (!address) return <Login />;

	return (
		<div className="bg-[#1c080d] min-h-screen flex flex-col">
			<Head>
				<title>$Dragon Lottery</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex-1">
				<Header />
				<Marquee className="bg-[#792136] p-5 mb-5" speed={50} gradient={false}>
					<div className="flex space-x-3 mx-10">
						<h4 className="text-white font-bold mr-5">Last Winner: {lastWinner?.toString()}</h4>
						<h4 className="text-white font-bold">
							Winnings: {lastWinnerAmount && ethers.utils.formatEther(lastWinnerAmount?.toString())}{' '}
							{`ETH`}
						</h4>
					</div>
				</Marquee>
				{lotteryOperator === address && (
					<div className="mx-auto">
						<AdminControls />
					</div>
				)}
				{lotteryOperator === address && <div className="mx-auto">{/* <AdminControls /> */}</div>}
				{winnings > 0 && (
					<div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5">
						<WithdrawButton winnings={winnings} address={address} />
					</div>
				)}

				{/* {The Next Lottery Drawing box} */}
				<div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row justify-center md:space-x-5">
					<div className="stats-container max-w-lg">
						<h1 className=" text-5xl text-white font-semibold text-center mb-5">
							The Next Lottery Drawing
						</h1>
						<div className="flex justify-between p-2 space-x-2">
							<div className="stats">
								<h2 className="text-sm">Total Prize Pool</h2>
								<p className="text-xl">
									{currentWinningReward &&
										(ethers.utils.formatEther(currentWinningReward) * 0.8).toString()}{' '}
									{`ETH`}
								</p>
							</div>
							<div className="stats">
								<h2 className="text-sm"> Tickets Remaining</h2>
								<p className="text-xl">{remainingTickets?.toNumber()}</p>
							</div>
						</div>
						{/* {Countdown Timer} */}
						<div className="mt-5 m-b 3">
							<CountdownTimer />
						</div>
					</div>

					<div className="stats-container space-y-2 max-w-lg">
						<div className="stats-container">
							<div className="flex justify-between items-center text-white pb-2">
								<h2>Price per ticket</h2>
								<p>
									{ticketPrice && ethers.utils.formatEther(ticketPrice.toString())} {`ETH`}
								</p>
							</div>
							<div>
								<p className="text-white pb-2 text-xs">
									You may purchase up to 5 tickets per lottery drawing
								</p>
							</div>
							<div className="flex text-white items-center space-x-2 bg-[#7e233d] border-[#692335] border p-4 mb-3">
								<p>TICKETS</p>
								<input
									className="flex w-full bg-transparent text-center outline-none"
									type="number"
									value={quantity}
									min={1}
									max={5}
									onChange={(e) => setQuantity(Number(e.target.value))}
								/>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between text-emerald-500 text-sm italic font-extrabold">
									<p>Total cost of tickets</p>
									<p>
										{ticketPrice &&
											Number(ethers.utils.formatEther(ticketPrice?.toString())) * quantity}{' '}
										{`ETH`}
									</p>
								</div>
								<div className="flex items-center justify-between text-emerald-500 text-xs italic">
									<p>Deployer Fees (included in total)</p>
									<p>
										{ticketCommission && ethers.utils.formatEther(ticketCommission.toString())}{' '}
										{`ETH`}
									</p>
								</div>
								<div className="flex items-center justify-between text-fuchsia-400 text-xs italic">
									<p>+ Gas Fees</p>
									<p></p>
								</div>
							</div>
							<BuyButton quantity={quantity} noOfUserTickets={userTickets} />
						</div>
						{userTickets >= 0 && (
							<div className="stats">
								<p>You have {userTickets} tickets in this drawing.</p>
								<div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2">
									{Array(userTickets)
										.fill('')
										.map((_, index) => (
											<p
												key={index}
												className="text-emerald-500 h-20 w-13  
                      rounded-lg flex flex-shrink-0 items-center-justify-center text-lg italic">
												{index + 1}
												<img src="ticket.png" alt="" />
											</p>
										))}
								</div>
							</div>
						)}
					</div>
				</div>

				<div>
					<img
						className="flex-1 ml-auto mr-auto mt-10 mb-10"
						src="$DRGN3D banner synthwave outrun.png"
						alt=""
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
