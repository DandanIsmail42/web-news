import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
	return (
		<div className="flex flex-col bg-neutral-100 h-screen w-screen overflow-hidden">
			<Navbar />
			<div className="p-2">
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
