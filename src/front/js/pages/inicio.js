import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Inicio = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSignUp = (e) => {
       
        e.preventDefault();
        actions.crearUsuario(email, password);
        setEmail("");
        setPassword("");
    };

    const handleLogin = (e) => {
        e.preventDefault();
        actions.iniciarSesion(email, password);
        navigate("/")
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="border bg-light p-2" style={{ width: "500px", marginRight: "10px" }}>
                <form className="text-start" onSubmit={handleSignUp}>
                    <div className="text-center">
                        <h1>Crear usuario</h1>
                    </div>
                    <div className="mt-3 mx-5">
                        <label htmlFor="signUpEmail" className="form-label">E-mail</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            className="form-control" 
                            id="signUpEmail" 
                            aria-describedby="emailHelp" 
                            value={email}
                        />
                    </div>
                    <div className="mt-3 mx-5">
                        <label htmlFor="signUpPassword" className="form-label">Contraseña</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password" 
                            className="form-control" 
                            id="signUpPassword"
                            value={password} 
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary text-center my-3">Enviar</button>
                    </div>
                </form>
            </div>
            <div className="border bg-light p-2" style={{ width: "500px" }}>
                <form className="text-start" onSubmit={handleLogin}>
                <div className="text-center">
                        <h1>Iniciar sesion</h1>
                    </div>
                    <div className="mt-3 mx-5">
                        <label htmlFor="loginEmail" className="form-label">E-mail</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            className="form-control" 
                            id="loginEmail" 
                            aria-describedby="emailHelp" 
                        />
                    </div>
                    <div className="mt-3 mx-5">
                        <label htmlFor="loginPassword" className="form-label">Contraseña</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password" 
                            className="form-control" 
                            id="loginPassword" 
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary text-center my-3">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
