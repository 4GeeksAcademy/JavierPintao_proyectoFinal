import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/">
                    <h1 className="display-3 font-weight-bold mb-0">
                        <span className="text-dark">PINTA</span><span className="text-primary">CAR</span>
                    </h1>
                </Link>
                <div className="d-flex">
                    <Link to="/inicio" className="btn btn-primary mb-3 mx-3" style={{ minWidth: '150px' }}>Iniciar sesión</Link>
                    <Link to="/publica" className="btn btn-primary mb-3 mx-3" style={{ minWidth: '150px' }}>Area personal</Link>
                    <Link to="/talleres" className="btn btn-primary mb-3 mx-3" style={{ minWidth: '150px' }}>Talleres</Link>
                    <Link to="/cesta" className="btn btn-primary mb-3 mx-3" style={{ minWidth: '150px' }}>Cesta</Link>
                </div>
            </div>
        </nav>
    );
};
