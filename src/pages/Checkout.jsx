import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RUS1rIv07aj4SOxglFzYdTXH4J16N4zVTwehl5mUXVbqCH4wbzqHO9rRrQzL8zNyXOVPLNkbL0CtjzowidG8b0e00N6oqha9j"
);

const Checkout = () => {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    stripePromise.then(setStripe);
  }, []);

  const handleCheckout = async () => {
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: "price_1RUTWKIv07aj4SOxvJS9DrGe", quantity: 1 }],
      mode: "subscription",
      successUrl: "http://localhost:5173/success",
    });

    if (error) {
      console.error(error);
         
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Stripe Payment Integration</h1>
      <button
        onClick={handleCheckout}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Pay with Stripe
      </button>
    </div>
  );
};

export default Checkout;
