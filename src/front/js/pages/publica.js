import React from "react";
import "../../styles/home.css";


export const Publica = () => {
    return (
        <div className="container d-flex flex-column align-items-center" style={{ height: '100vh' }}>
            <h1 className="parrafo mb-4">Publica su anuncio</h1>
            <div className="card" style={{ width: '18rem' }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Marca y modelo</h5>
                    <input type="text" className="form-control mb-3" placeholder="Marca y modelo" />
                    
                    <div className="d-flex mb-3">
                        <div className="me-2 flex-fill">
                            <h5 className="card-title">Kilómetros</h5>
                            <input type="number" className="form-control" placeholder="Kilómetros" />
                        </div>
                        <div className="flex-fill">
                            <h5 className="card-title">Año</h5>
                            <input type="number" className="form-control" placeholder="Año" />
                        </div>
                    </div>
                    
                    <h5 className="card-title">Descripción</h5>
                    <textarea className="form-control mb-3" rows="3" placeholder="Escribe una descripción aquí"></textarea>
                    
                    <div className="d-flex">
                        <a href="#" className="btn btn-primary me-2">Añadir a la cesta</a>
                        <a href="#" className="btn btn-primary">Comprar</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
