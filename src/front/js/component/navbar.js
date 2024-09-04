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
					<Link to="/">
						<span className="navbar-brand mb-0 h1"><i className="fa fa-house text-primary" /></span>
					</Link>
					<Link to="/demo">
						<button className="btn btn-primary ml-3">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
