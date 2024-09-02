import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-0">
			<h1 className="display-3 font-weight-bold titulo">
				<span className="text-dark">PINTA</span><span className="text-primary">CAR</span>
			</h1>
			<p className="lead text-muted custom-paragraph">
				PORTAL NUMERO UNO EN COMPRAVENTA DE VEHICULOS
			</p>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12 col-md-6 d-flex flex-column mt-3">
						<button type="button" className="btn btn-primary mb-3">Vender mi coche</button>
						<button type="button" className="btn btn-primary mb-3">Comprar coche</button>
						<button type="button" className="btn btn-primary mb-3">Talleres</button>
						<button type="button" className="btn btn-primary mb-3">Stock</button>
					</div>
				</div>
			</div>
		</div>
	);
};
