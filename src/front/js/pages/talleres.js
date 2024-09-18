import React, { useState } from "react";
import MapComponent from "../component/mapComponent";

export const Talleres = () => {
    const [mapCenter, setMapCenter] = useState({
        lat: -3.745,
        lng: -38.523
    });

    const handleButtonClick = () => {
        setMapCenter({
            lat: 37.7749,  // Nueva latitud (por ejemplo, San Francisco)
            lng: -122.4194 // Nueva longitud (por ejemplo, San Francisco)
        });
    };

    return (
        <div className="text-muted parrafo-linea mt-5">
            <p className=" text-muted parrafo">
                En esta seccion encontraras nuestra red talleres de concertados.
            </p>
            <p className="lead text-muted parrafo">
                Si es vendedor podra poner a punto su vehiculo antes de sacarlo a la venta.
            </p>
            <p className="lead text-muted parrafo-linea">
                Si es comprador podra revisarlo por completo para comprar con toda seguridad.
            </p>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-sm-8">
                        <MapComponent center={mapCenter} />
                    </div>
                    <div className="text-center mt-4">
                        <button onClick={handleButtonClick} className="btn btn-primary">
                            Ir a San Francisco
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
