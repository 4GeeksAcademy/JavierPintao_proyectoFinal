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

    // Estados para mensajes de éxito o error
    const [signUpSuccess, setSignUpSuccess] = useState(null); 
    const [signUpError, setSignUpError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(null);  // Estado para éxito en iniciar sesión
    const [loginError, setLoginError] = useState(null);  // Estado para error en iniciar sesión

    const navigate = useNavigate();
    
    const handleSignUp = (e) => {
        e.preventDefault();

        // Resetear mensajes de éxito y error
        setSignUpSuccess(null);
        setSignUpError(null);

        actions.crearUsuario(signUpEmail, signUpPassword)
            .then(() => {
                setSignUpSuccess("Usuario creado con éxito.");
                setSignUpEmail("");
                setSignUpPassword("");
            })
            .catch((error) => {
                setSignUpError("Error al crear el usuario. Intenta nuevamente.");
                console.error(error);
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Resetear mensajes de éxito y error
        setLoginSuccess(null);
        setLoginError(null);

        actions.iniciarSesion(loginEmail, loginPassword)
            .then(() => {
                // Inicio de sesión exitoso
                setLoginSuccess("Inicio de sesión exitoso.");
                navigate("/");  // Redirigir al usuario a la página principal o donde prefieras
            })
            .catch((error) => {
                // Hubo un error al iniciar sesión
                setLoginError("Error al iniciar sesión. Verifica tus credenciales.");
                console.error(error);
            });
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
                            required
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
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary text-center my-3">Enviar</button>
                    </div>

                    {/* Mostrar mensaje de éxito o error */}
                    {signUpSuccess && <div className="alert alert-success text-center">{signUpSuccess}</div>}
                    {signUpError && <div className="alert alert-danger text-center">{signUpError}</div>}
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
                            required
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
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary text-center my-3">Enviar</button>
                    </div>

                    {/* Mostrar mensaje de éxito o error */}
                    {loginSuccess && <div className="alert alert-success text-center">{loginSuccess}</div>}
                    {loginError && <div className="alert alert-danger text-center">{loginError}</div>}
                </form>
            </div>
        </div>
    );
};
