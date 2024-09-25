import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Cesta = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center">
			<h1>Cesta de la compra</h1>
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
