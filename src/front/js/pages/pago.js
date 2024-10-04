import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CheckoutForm } from "../component/checkout.jsx";
 const Pago = () => {
    const { store, actions } = useContext(Context);
    //la clave en .env!!! ----------- esta de abajo es la clave
    const stripePromise = loadStripe('pk_test_51LTCnvA9wzTLXCekEhm8avkeiNhSTSIGyDiiW5mv6I980PUyArXqXDBJiiYemkIhhAJr7WncWbslGBEHQdRGUnKw001ZOSE45L');
    return (
        <div className="text-center mt-5">
            <h1>Stripe implementation</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};
export default Pago;







