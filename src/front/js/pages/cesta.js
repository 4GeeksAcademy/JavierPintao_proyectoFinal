import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Cesta = () => {
    const { store, actions } = useContext(Context);

    

    return (
        <div className="container my-5 bg-light">
            <h1 className="text-muted text-center mb-4">Cesta</h1>
            <div className="row">
                {store.cesta.length > 0 ? (
                    store.cesta.map((anuncio, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{anuncio.marca}</h5>
                                    <p className="card-text"><strong>Kilómetros:</strong> {anuncio.kilometros}</p>
                                    <p className="card-text"><strong>Año:</strong> {anuncio.ano}</p>
                                    <p className="card-text"><strong>Precio:</strong> {anuncio.precio.toLocaleString()} €</p>
                                    <p className="card-text"><strong>Descripción:</strong> {anuncio.descripcion}</p>
                                    
                                    <div className="d-flex justify-content-between mt-3">
                                        <button 
                                            onClick={() => actions.addCesta(anuncio)} 
                                            className="btn btn-danger"
                                            style={{ minWidth: '100px' }}
                                        >
                                            Eliminar
                                        </button>
                                        <Link 
                                            to="/pago" 
                                            className="btn btn-primary" 
                                            style={{ minWidth: '100px' }}
                                        >
                                            Comprar
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <div className="alert alert-warning text-center" role="alert">
                            No hay anuncios en la cesta.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
