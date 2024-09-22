import React, { useState } from "react";
import MapComponent from "../component/mapComponent";

export const Talleres = () => {
    const [mapCenter, setMapCenter] = useState({
        lat: 40.4168,
        lng: -3.7038
    });

    const handleButtonClickM = () => {
        setMapCenter({ lat: 40.4168, lng: -3.7038 });
    };

    const handleButtonClickB = () => {
        setMapCenter({ lat: 41.3851, lng: 2.1734 });
    };

    const handleButtonClickV = () => {
        setMapCenter({ lat: 39.4699, lng: -0.3763 });
    };

    return (
        <div className="text-center parrafo mt-5">
            <p className="text-muted parrafo">
                En esta sección encontrarás nuestra red de talleres concertados
            </p>
           
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-sm-8">
                        <MapComponent center={mapCenter} />
                    </div>
                    <div className="col-md-4 d-flex flex-column mt-4" style={{ height: '100%' }}>
                        <button onClick={handleButtonClickM} className="btn btn-primary flex-grow-1 mb-2">
                            Taller Madrid
                        </button>
                        <button onClick={handleButtonClickB} className="btn btn-secondary flex-grow-1 mb-2">
                            Taller Barcelona
                        </button>
                        <button onClick={handleButtonClickV} className="btn btn-success flex-grow-1 mb-2">
                            Taller Valencia
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
