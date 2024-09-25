import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Publica = () => {
    const { store, actions } = useContext(Context); //
    const [marca, setMarca] = useState("");
    const [kilometros, setKilometros] = useState("");
    const [ano, setAno] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [mensaje, setMensaje] = useState(""); // Estado para el mensaje de éxito

    const handlePublicar = () => {
        actions.addAnuncio(marca, kilometros, ano, precio, descripcion); // Llamar a la acción
        setMensaje("Anuncio publicado con éxito!");
        // Aquí puedes agregar lógica adicional, como limpiar el formulario o mostrar un mensaje
    };

    return (
        <div className="container d-flex flex-column align-items-between" style={{ height: '125vh' }}>
            <div className="d-flex flex-row">
                {/* Formulario */}
                <div className="card my-5" style={{ width: '18rem', marginRight: '20px' }}>
                    <div className="card-body">
                        <h1 className="text-muted parrafo mb-4">Publica su anuncio</h1>
                        <h5 className="card-title">Marca y modelo</h5>
                        <input type="text" className="form-control mb-3" placeholder="Marca y modelo" value={marca} onChange={(e) => setMarca(e.target.value)} />
                        
                        <h5 className="card-title">Kilómetros</h5>
                        <input type="number" className="form-control mb-3" placeholder="Kilómetros" value={kilometros} onChange={(e) => setKilometros(e.target.value)} />
    
                        <h5 className="card-title">Año</h5>
                        <input type="number" className="form-control mb-3" placeholder="Año" value={ano} onChange={(e) => setAno(e.target.value)} />
                        
                        <h5 className="card-title">Precio</h5>
                        <input type="number" className="form-control mb-3" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                       
                        <h5 className="card-title">Descripción</h5>
                        <textarea className="form-control mb-3" rows="3" placeholder="Escribe una descripción aquí" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                        
                        <button className="btn btn-success mt-4" onClick={handlePublicar}>Publica</button>
    
                        {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
                    </div>
                </div>
    
                {/* Contenedor de Mis Anuncios */}
                <div className="container my-5 bg-light" style={{ flex: 1 }}>
                    <h1 className="text-muted text-center mb-4">Mis anuncios</h1>
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
                                                <button onClick={() => actions.addCesta(anuncio)} className="fa fa-shopping-cart" title="Añadir a la cesta"></button>
                                                <button onClick={() => actions.eliminarAnuncio(anuncio.id)} className="btn btn-danger ml-2" style={{ marginLeft: "10px" }}>
                                                    Eliminar
                                                </button>
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
        </div>
    );
    
};
