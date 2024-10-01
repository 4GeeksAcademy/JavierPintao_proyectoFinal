import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";



export const Home = () => {
	const { store, actions } = useContext(Context);
	
	useEffect(() => {
        actions.getAnuncios(); // Cambiar a misAnuncios para obtener solo los anuncios del usuario
    }, []);


	return (
		<div className="text-center mt-0">
			<p className="text-muted parrafo-linea mt-5">
				PORTAL NUMERO UNO EN COMPRAVENTA DE VEHICULOS
			</p>
			<div className="container my-5 bg-light">
				<h1 className="text-muted text-center mb-4">Stock</h1>

				<div className="row">
					{store.anuncios.length > 0 ? (
						store.anuncios.map((anuncio, index) => (
							<div key={index} className="col-md-4 mb-4">
								<div className="card shadow-sm">
									<div className="card-body">
										<h5 className="card-title">{anuncio.marca}</h5>
										<p className="card-text"><strong>Kilómetros:</strong> {anuncio.kilometros}</p>
										<p className="card-text"><strong>Año:</strong> {anuncio.ano}</p>
										<p className="card-text"><strong>Precio:</strong> {anuncio.precio.toLocaleString()} €</p>
										<p className="card-text"><strong>Descripción:</strong> {anuncio.descripcion}</p>
										<div className="d-flex justify-content-between">
											<button
												onClick={() => actions.addCesta(anuncio)}
												className="fa fa-shopping-cart"
												title="Añadir a la cesta"
												style={{ color: 'blue' }}
											></button>
											
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="col-12">
							<div className="alert alert-warning text-center" role="alert">
								No hay anuncios publicados.
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
