import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Publica = () => {
    const { store, actions } = useContext(Context);
    const [marca, setMarca] = useState("");
    const [kilometros, setKilometros] = useState("");
    const [ano, setAno] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [editingId, setEditingId] = useState(null); // Estado para el ID del anuncio en edición
    const emailUsuario = store.email;

    const handlePublicar = async () => {
        try {
            if (editingId) {
                await actions.editarAnuncio(editingId, marca, kilometros, ano, precio, descripcion);
                setMensaje("Anuncio editado con éxito!");
            } else {
                await actions.addAnuncio(marca, kilometros, ano, precio, descripcion);
                setMensaje("Anuncio publicado con éxito!");
            }
            resetForm(); // Resetea el formulario después de que la acción se complete
        } catch (err) {
            console.error("Error al publicar o editar el anuncio:", err);
            setMensaje("Hubo un problema al procesar su solicitud."); // Muestra un mensaje al usuario
        }
    };

    const resetForm = () => {
        setMarca("");
        setKilometros("");
        setAno("");
        setPrecio("");
        setDescripcion("");
        setEditingId(null);
    };

    const handleEdit = (anuncio) => {
        setMarca(anuncio.marca);
        setKilometros(anuncio.kilometros);
        setAno(anuncio.ano);
        setPrecio(anuncio.precio);
        setDescripcion(anuncio.descripcion);
        setEditingId(anuncio.id); // Establece el ID del anuncio a editar
    };

    useEffect(() => {
        actions.misAnuncios(); // Cambiar a misAnuncios para obtener solo los anuncios del usuario
    }, []); // Agregado actions como dependencia

    // Console.log para verificar anuncios obtenidos
    useEffect(() => {
        console.log("Mis Anuncios:", store.mis_anuncios);
    }, [store.mis_anuncios]);

    return (
        <div className="container d-flex flex-column align-items-between">
            <h5 className="text-end">{store.email ? `USUARIO: ${store.email}` : "No hay usuario autenticado"}</h5>
            <div className="d-flex flex-row">
                <div className="card my-5 mt-0" style={{ width: '18rem', marginRight: '20px' }}>
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
                        
                        <button className="btn btn-success mt-4" onClick={handlePublicar}>
                            {editingId ? "Actualizar" : "Publicar"}
                        </button>

                        {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
                    </div>
                </div>
    
                <div className="container my-5 bg-light" style={{ flex: 1 }}>
                    <h1 className="text-muted text-center mb-4">Mis anuncios</h1>
                    <div className="row">
                        {store.mis_anuncios && store.mis_anuncios.length > 0 ? (
                            store.mis_anuncios.map((anuncio, index) => (
                                <div key={index} className="col-md-4 mb-4">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title">{anuncio.marca}</h5>
                                            <p className="card-text"><strong>Kilómetros:</strong> {anuncio.kilometros}</p>
                                            <p className="card-text"><strong>Año:</strong> {anuncio.ano}</p>
                                            <p className="card-text"><strong>Precio:</strong> {anuncio.precio} €</p> {/* Eliminado toLocaleString() */}
                                            <p className="card-text"><strong>Descripción:</strong> {anuncio.descripcion}</p>
                                            <div className="d-flex justify-content-between">
                                                <button onClick={() => handleEdit(anuncio)} className="btn btn-primary ml-2">
                                                    Editar
                                                </button>
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
