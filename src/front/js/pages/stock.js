import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Stock = () => {
    
    const { store, actions } = useContext(Context); 

    return (
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
                                    <p className="card-text"><strong>Precio:</strong> {anuncio.precio.toLocaleString()} €</p> {/* Cambiado aquí */}
                                    <p className="card-text"><strong>Descripción:</strong> {anuncio.descripcion}</p>
                                    <button onClick={()=>actions.addCesta(anuncio)} className="fa fa-shopping-cart"></button>

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
    );
};
