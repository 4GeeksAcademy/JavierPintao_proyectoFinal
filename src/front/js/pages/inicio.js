import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Inicio = () => {
    const { actions } = useContext(Context);
    
    // Estado para el formulario de crear usuario
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");

    // Estado para el formulario de iniciar sesión
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const navigate = useNavigate();
    
    const handleSignUp = (e) => {
        e.preventDefault();
        actions.crearUsuario(signUpEmail, signUpPassword);
        setSignUpEmail("");
        setSignUpPassword("");
    };

    const handleLogin = (e) => {
        e.preventDefault();
        actions.iniciarSesion(loginEmail, loginPassword);
        navigate("/");
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            {/* Formulario de creación de usuario */}
            <div className="border bg-light p-2" style={{ width: "500px", marginRight: "10px" }}>
                <form className="text-start" onSubmit={handleSignUp}>
                    <div className="text-center">
                        <h1>Crear usuario</h1>
                    </div>
                    <div className="mt-3 mx-5">
                        <label htmlFor="signUpEmail" className="form-label">E-mail</label>
                        <input 
                            onChange={(e) => setSignUpEmail(e.target.value)} 
                            type="email" 
                            className="form-control" 
                            id="signUpEmail" 
                            value={signUpEmail}
                        />
                    </div>
                    <div className="mt-3 mx-5">
                        <label htmlFor="signUpPassword" className="form-label">Contraseña</label>
                        <input 
                            onChange={(e) => setSignUpPassword(e.target.value)} 
                            type="password" 
                            className="form-control" 
                            id="signUpPassword"
                            value={signUpPassword} 
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary text-center my-3">Enviar</button>
                    </div>
                </form>
            </div>

            {/* Formulario de inicio de sesión */}
            <div className="border bg-light p-2" style={{ width: "500px" }}>
                <form className="text-start" onSubmit={handleLogin}>
                    <div className="text-center">
                        <h1>Iniciar sesión</h1>
                    </div>
                    <div className="mt-3 mx-5">
                        <label htmlFor="loginEmail" className="form-label">E-mail</label>
                        <input 
                            onChange={(e) => setLoginEmail(e.target.value)} 
                            type="email" 
                            className="form-control" 
                            id="loginEmail" 
                            value={loginEmail}
                        />
                    </div>
                    <div className="mt-3 mx-5">
                        <label htmlFor="loginPassword" className="form-label">Contraseña</label>
                        <input 
                            onChange={(e) => setLoginPassword(e.target.value)} 
                            type="password" 
                            className="form-control" 
                            id="loginPassword"
                            value={loginPassword}
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
