import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-0">
			<p className="text-muted parrafo-linea mt-5">
				PORTAL NUMERO UNO EN COMPRAVENTA DE VEHICULOS
			</p>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12 d-flex flex-column mt-3">
						<Link to="/vende" >
							<button type="button" className="btn btn-primary col-8 mb-3">Vender mi coche</button>
						</Link>
						<Link to="/compra">
							<button type="button" className="btn btn-primary mb-3 col-8">Comprar coche</button>
						</Link>
						<Link to="/talleres">
							<button type="button" className="btn btn-primary mb-3 col-8">Talleres</button>
						</Link>
						<Link to="/stock">
						<button type="button" className="btn btn-primary mb-3 col-8">Stock</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
