import React from "react";

const History = () => {
	const readHistory = JSON.parse(localStorage.getItem("readHistory")) || [];

	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="text-xl font-sans font-semibold mb-2">
				Daftar Berita yang Pernah Dibaca
			</h1>
			<div
				style={{
					width: "80%",
					display: "flex",
					flexWrap: "wrap",
					height: "100%",
					maxHeight: "85vh",
					overflow: "scroll",
					justifyContent: "end",
					gap: "10px",
				}}
			>
				{readHistory.map((items, i) => (
					<div
						key={i}
						className="w-[49%]  bg-white shadow-md overflow-y-scroll overflow-x-hidden mb-2"
					>
						<img className="w-full h-1/2" src={items.image} />
						<div className="p-2">
							<h1 className="font-semibold">{items.title}</h1>
							<p className="mt-1 text-sm">{items.description}</p>
							<a
								className="text-blue-500 hover:text-gray-300 text-sm"
								target="_blank"
								href={items.url}
							>
								Baca selengkapnya . . .
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default History;
