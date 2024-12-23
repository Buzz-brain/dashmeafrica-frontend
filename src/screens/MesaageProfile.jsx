import React from "react";
import { useNavigation, useParams, useRoutes } from "react-router-dom";

export default function MesaageProfile() {
	const { username } = useParams();

	return (
		<section className="mx-16 py-10">
			<div className="flex flex-col md:flex-row md:flex-wrap justify-between space-y-10 md:space-y-0">
				<div className="flex-auto text-center flex flex-col items-center md:order-2">
					<img
						src="placeholder.png"
						alt={username}
						className="size-52 rounded-full mb-4"
					/>
					<p className="font-bold text-2xl">{username}</p>
					<p className="flex items-center justify-center mt-8">
						{[1, 2, 3, 4, 5].map(() => (
							<img src="/svg/star.svg" className="size-8" />
						))}
					</p>
					<p className="text-lg font-semibold">54 reviews</p>
				</div>
				<div className="flex-auto flex items-start justify-center md:justify-end gap-3 md:order-3">
					<button className="text-green-100 bg-[green] rounded-xl py-2 px-3">
						Message
					</button>
					<button className="text-[green] border-2 border-[green]/50 rounded-xl py-2 px-3">
						Follow
					</button>
					<button className="text-red-900 border-2 border-red-900/50 rounded-xl py-2 px-3">
						Report
					</button>
				</div>
				<div className="flex-auto space-y-2 md:order-1  ">
					<h4 className="mb-4 font-bold md:text-start text-center">About:</h4>
					{[
						{
							key: "Location",
							value: "Rumuolumeni, Port Harcourt, Rivers State.",
						},
						{
							key: "Last seen",
							value: "6 hours ago",
						},
						{
							key: "Followers",
							value: "15 follower",
						},
						{
							key: "Following",
							value: "4 following",
						},
					].map((item) => (
						<p className="flex justify-center md:justify-start">
							<span className="font-semibold w-[20%]">{item.key}:</span>
							<span className="">{item.value}</span>
						</p>
					))}
					<h4 className="mt-4 font-semibold md:text-start text-center">Bio:</h4>
					<p>Bio: I’m a student who sells random stuff for the extra cash</p>
				</div>
			</div>
			{/* <Row className="px-5">
				{products.map((product) => (
					<Col key={product._id} sm={12} md={6} lg={4} xl={2}>
						<Product product={product} />
					</Col>
				))}
			</Row> */}
		</section>
	);
}
