import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-between align-items-center">
				<Link to="/">
					<h1 className="display-3 font-weight-bold mb-0 ">
						<span className="text-dark">PINTA</span><span className="text-primary">CAR</span>
					</h1>
				</Link>
				<div className="d-flex">
					<Link to="/demo" className="ml-3">
						<span className="navbar-brand mb-0 h1">
							<i className="fa fa-shopping-cart text-primary" />
						</span>
					</Link>
				</div>
			</div>
		</nav>
	);
};
