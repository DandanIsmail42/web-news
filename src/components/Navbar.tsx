// src/components/Navbar.tsx
import { useState } from "react";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const toggleNavbar = () => {
		setIsOpen(!isOpen);
	};
	console.log(search);
	return (
		<nav className="bg-gray-800 p-4">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				<div className="flex items-center">
					<h1 className="text-white font-bold text-xl">
						<span className="text-red-500">N</span>ews
					</h1>
				</div>
				<div className="hidden md:flex space-x-4">
					<a href="/" className="text-white hover:text-gray-300">
						Home
					</a>
					<a
						href="/history"
						className="text-white hover:text-gray-300"
					>
						History
					</a>
				</div>
				<div className="md:hidden">
					<button
						className="text-white hover:text-gray-300 focus:outline-none"
						onClick={toggleNavbar}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							{isOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16m-7 6h7"
								/>
							)}
						</svg>
					</button>
				</div>
			</div>
			{isOpen && (
				<div className="md:hidden mt-2 flex flex-col space-y-2">
					<a href="/" className="text-white hover:text-gray-300">
						Home
					</a>
					<a
						href="/history"
						className="text-white hover:text-gray-300"
					>
						History
					</a>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
