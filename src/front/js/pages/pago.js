import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from "../component/checkout.jsx";
import "../../styles/Pago.css";

const Pago = () => {
    const { store, actions } = useContext(Context);
    // la clave en .env!!! ----------- esta de abajo es la clave
    const stripePromise = loadStripe('pk_test_51LTCnvA9wzTLXCekEhm8avkeiNhSTSIGyDiiW5mv6I980PUyArXqXDBJiiYemkIhhAJr7WncWbslGBEHQdRGUnKw001ZOSE45L');

    // Acceder a la URL de pago desde las variables de entorno
    const paymentUrl = process.env.PAYMENT_URL;
    
    return (
        <div className="pago-container mt-5 bg-light">
            <h1 className="title">¡Completa tu compra!</h1>
            <p className="description">Por favor, proporciona tus datos de pago a continuación.</p>
            <Elements className="mt-2" stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default Pago;
