import React from "react";
import { useEffect } from "react" ; 
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Success = () => {
   const { clearCart } = useCart();

    useEffect(() => {
    clearCart();
  }, []);
  return (
    <Container sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h3" color="success.main">🎉 Payment Successful! 🎉</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Thank you for your purchase! Your order has been confirmed.
      </Typography>
      <Button 
        component={Link} 
        to="/" 
        variant="contained" 
        color="primary" 
        sx={{ mt: 4, padding: "12px 24px", fontSize: "18px" }}
      >
        Go to Homepage
      </Button>
    </Container>
  );
};

export default Success;
