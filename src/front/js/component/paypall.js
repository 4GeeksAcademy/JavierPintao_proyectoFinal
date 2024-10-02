import React, { useEffect } from "react";

const PayPalButton = ({ amount }) => {
  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount, // El valor que estás cobrando
              },
            },
          ],
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then((details) => {
          alert("Pago completado por " + details.payer.name.given_name);
          // Aquí podrías enviar los detalles del pago a tu backend
        });
      },
      onError: (err) => {
        console.error(err);
        alert("Hubo un error al procesar el pago.");
      },
    }).render("#paypal-button-container");
  }, [amount]);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;
