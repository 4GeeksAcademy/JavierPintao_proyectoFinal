import React from "react";

export const Publica = () => {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">marca y modelo</h5>
                <h5 className="card-title">kilometros</h5>
                <h5 className="card-title">año</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">añadir a la cesta</a>
                <a href="#" className="btn btn-primary">comprar</a>
            </div>
        </div>
    );
};
