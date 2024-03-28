import axios from "axios";
import React, { useEffect, useState } from "react";
import SkeletonLoader from "../components/Skeleton";

const Home = () => {
	const [popularNews, setPopularNews] = useState(null);
	const [everyThingNews, setEverythingNews] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("bitcoin");

	useEffect(() => {
		const fetchPopularNews = async () => {
			try {
				const response = await axios.get(
					"https://newsapi.org/v2/top-headlines",
					{
						params: {
							apiKey: "74f0cb22ba5245b493bd7b8ed4e8b130",
							country: "us",
							pageSize: 1,
						},
					}
				);
				setPopularNews(response.data.articles[0]);
			} catch (error) {
				console.error("Error fetching popular news:", error);
			}
		};

		fetchPopularNews();
	}, []);

	useEffect(() => {
		const fetchEverythingNews = async () => {
			try {
				const response = await axios.get(
					"https://newsapi.org/v2/everything",
					{
						params: {
							q: searchQuery,
							pageSize: 4,
							page: currentPage,
							apiKey: "74f0cb22ba5245b493bd7b8ed4e8b130",
						},
					}
				);
				setEverythingNews(response.data.articles);
				setTotalPages(Math.ceil(response.data.totalResults / 4));
				setLoading(false);
			} catch (error) {
				console.error("Error fetching popular news:", error);
			}
		};

		fetchEverythingNews();
	}, [currentPage, searchQuery]);

	const formatDate = (dateString) => {
		const options = {
			weekday: "short",
			day: "numeric",
			month: "short",
			hour: "numeric",
			minute: "numeric",
		};
		return new Date(dateString).toLocaleDateString("id-ID", options);
	};

	const addToReadHistory = (news) => {
		const readHistory =
			JSON.parse(localStorage.getItem("readHistory")) || [];
		const updatedHistory = [
			...readHistory,
			{ title: news.title, image: news.urlToImage, url: news.url },
		];
		localStorage.setItem("readHistory", JSON.stringify(updatedHistory));
	};

	return (
		<div style={{ height: "120%", maxHeight: "90vh", overflow: "auto" }}>
			<input
				type="text"
				className="rounded-md mb-3 w-full h-9 bg-gray-400 text-white p-2"
				placeholder="search"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<div className="bg-gray-100 flex gap-2">
				<section className="w-[40%]">
					<div className="w-full h-[85vh] bg-white shadow-md overflow-scroll">
						<img
							className="w-full h-1/2"
							src={popularNews?.urlToImage}
						/>
						<div className="p-2">
							<div className="flex justify-between items-center">
								<h1 className="text-xl font-bold mt-2">
									{popularNews?.author}
								</h1>
								<p className="text-gray-500">
									{formatDate(popularNews?.publishedAt)}
								</p>
							</div>
							<h1 className="text-md font-semibold">
								{popularNews?.source.name}
							</h1>
							<h1 className="text-md font-semibold">
								{popularNews?.title}
							</h1>
							<p className="mt-1">{popularNews?.description}</p>
							<a
								className="text-blue-500 hover:text-gray-300"
								target="_blank"
								href={popularNews?.url}
								onClick={() => addToReadHistory(popularNews)}
							>
								Baca selengkapnya . . .
							</a>
						</div>
					</div>
				</section>
				<section
					style={{
						width: "60%",
						display: "flex",
						flexWrap: "wrap",
						height: "100%",
						maxHeight: "90vh",
						overflow: "scroll",
						justifyContent: "end",
						gap: "10px",
					}}
				>
					{loading ? (
						Array.from({ length: 4 }).map((_, index) => (
							<SkeletonLoader key={index} />
						))
					) : (
						<>
							{everyThingNews.map((items, i) => (
								<div
									key={i}
									className="w-[49%]  bg-white shadow-md overflow-y-scroll overflow-x-hidden mb-2"
								>
									<img
										className="w-full h-1/2"
										src={items.urlToImage}
									/>
									<div className="p-2">
										<div className="flex justify-between items-center">
											<h1 className="font-bold mt-1">
												{items.author}
											</h1>
											<p className="text-sm text-gray-500">
												{formatDate(items.publishedAt)}
											</p>
										</div>
										<h1 className="font-semibold">
											{items.source.name}
										</h1>
										<h1 className="font-semibold">
											{items.title}
										</h1>
										<p className="mt-1 text-sm">
											{items.description}
										</p>
										<a
											className="text-blue-500 hover:text-gray-300 text-sm"
											target="_blank"
											href={items.url}
											onClick={() =>
												addToReadHistory(items)
											}
										>
											Baca selengkapnya . . .
										</a>
									</div>
								</div>
							))}
						</>
					)}
					<div>
						{currentPage > 1 && (
							<button
								className="mx-1 px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-800 hover:text-white"
								onClick={() => setCurrentPage(currentPage - 1)}
							>
								Prev
							</button>
						)}
						{[...Array(Math.min(3, totalPages))].map((_, index) => {
							const pageNumber = index + 1;
							const isCurrentPage = pageNumber === currentPage;
							return (
								<button
									key={index}
									className={`mx-1 px-3 py-1 rounded-md hover:bg-gray-800 hover:text-white ${
										isCurrentPage
											? "bg-gray-500"
											: "bg-gray-300"
									}`}
									onClick={() => setCurrentPage(pageNumber)}
								>
									{pageNumber}
								</button>
							);
						})}
						{currentPage > 3 && totalPages > 3 && (
							<button
								className="mx-1 px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-800 hover:text-white"
								onClick={() => setCurrentPage(currentPage + 1)}
							>
								{currentPage}
							</button>
						)}
						{currentPage < totalPages && (
							<button
								className="mx-1 px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-800 hover:text-white"
								onClick={() => setCurrentPage(currentPage + 1)}
							>
								Next
							</button>
						)}
					</div>
				</section>
			</div>
		</div>
	);
};

export default Home;
