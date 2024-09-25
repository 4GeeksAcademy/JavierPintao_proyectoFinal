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
        <div className="container d-flex flex-column align-items-center" style={{ height: '100vh' }}>
            <h1 className="text-muted parrafo mb-4">Publica su anuncio</h1>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                    
                    <h5 className="card-title">Marca y modelo</h5>
                    <input type="text" className="form-control mb-3" placeholder="Marca y modelo" value={marca} onChange={(e) => setMarca(e.target.value)} />
                    
                    <h5 className="card-title">Kilómetros</h5>
                    <input type="number" className="form-control mb-3" placeholder="Kilómetros" value={kilometros} onChange={(e) => setKilometros(e.target.value)} />

                    <h5 className="card-title">Año</h5>
                    <input type="number" 
                    className="form-control mb-3" 
                    placeholder="Año" 
                    value={ano} 
                    onChange={(e) => setAno(e.target.value)} />
                    
                    <h5 className="card-title">Precio</h5>
                    <input type="number" 
                    className="form-control mb-3" 
                    placeholder="Precio" 
                    value={precio} 
                    onChange={(e) => setPrecio(e.target.value)} />
                   
                    <h5 className="card-title">Descripción</h5>
                    <textarea className="form-control mb-3" rows="3" placeholder="Escribe una descripción aquí" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                    
                    <button className="btn btn-success mt-4" onClick={handlePublicar}>Publica</button>

                    {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>} {/* Mensaje de éxito */}
                </div>
            </div>
        </div>
    );
};
