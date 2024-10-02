import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PayPalButton from "../component/paypall";  

export const Cesta = () => {
    const { store, actions } = useContext(Context);

    const handlePaymentSuccess = (details, anuncio) => {
        // Aquí puedes realizar la lógica que sigue después de un pago exitoso
        // Por ejemplo, eliminar el anuncio de la cesta o actualizar el estado en la base de datos
        console.log("Transaction completed by: ", details.payer.name.given_name);
        actions.addCesta(anuncio); // Eliminar de la cesta después del pago exitoso
    };

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
                                    <button 
                                        onClick={() => actions.addCesta(anuncio)} 
                                        className="fa fa-trash"
                                        style={{ color: 'red' }}
                                    ></button>

                                    {/* PayPal button with dynamic amount */}
                                    {/*
                                    <PayPalButton 
                                        amount={anuncio.precio}  // Aquí pasamos el precio del anuncio dinámicamente
                                        currency="EUR"            // Cambiar la moneda a EUR
                                        onSuccess={(details) => handlePaymentSuccess(details, anuncio)} // Lógica después del pago exitoso
                                    />
                                    */}
                                    
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
