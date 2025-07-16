

import  { useEffect, useState ,useContext } from "react";
import { useCart } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, Navigate } from "react-router-dom";

import { UserContext } from "../context/userContext";
const stripePromise = loadStripe("pk_test_51RUS1rIv07aj4SOxglFzYdTXH4J16N4zVTwehl5mUXVbqCH4wbzqHO9rRrQzL8zNyXOVPLNkbL0CtjzowidG8b0e00N6oqha9j");

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    total,
    addToCart,
    allremoveFromCart,
    clearCart,
  } = useCart();

  const TAX_RATE = 0.1;
  const taxAmount = total * TAX_RATE;
  const grandTotal = total + taxAmount;
  const [stripe, setStripe] = useState(null);


   const { token } = useContext(UserContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    stripePromise.then(setStripe);
  }, []);

  if (cartItems.length === 0) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src="https://myntraweb.blob.core.windows.net/selfserveui/assets/svg/ErroScreenV2.svg"
            alt="Empty Cart"
            style={{ width: 300, marginBottom: 24 }}
          />
          <Typography variant="h5" sx={{ mt: 2 , fontWeight:"bold" }}>
            You haven't placed any order yet!
          </Typography>
          <Typography variant="body1" sx={{ mt: 2  }}>
Order section is empty. After placing order, You can track them from here!
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            sx={{ mt: 3, mb:6 , backgroundColor: "#131e36" }}
          >
            Shop Now
          </Button>
        </Box>
      </Container>
    );
  }


  const handleCheckout = async () => {
    const stripe = await stripePromise;


    const res = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems }),
    });

    const data = await res.json();
    console.log("Stripe session data:", data);


    const result = await stripe.redirectToCheckout({ sessionId: data.id });
    
if (!stripe || !data.id) {
  console.error("Stripe not loaded or session ID missing");
  return;
}

    if (result.error) {
      console.error("Error:", result.error);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ mt: 8 }}>
        Shopping Cart
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: { xs: "wrap", md: "nowrap" },
          gap: 4,
          mt: 4,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: 10,
          }}
        >
          {cartItems.map((product) => (
            <Card
              key={product._id}
              sx={{
                display: "flex",
                mb: 3,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
                width: "80%",
              }}
            >
              <Link
                to={`/product/${product._id}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    height: "200px",
                    width: "120px",
                    p: 2,
                    display: "block",
                    margin: "auto",
                    objectFit: "contain",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: "black" }}>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category}
                  </Typography>
                  <Typography sx={{ fontWeight: "bold", color: "black" }}>
                    ₹ {product.price}
                  </Typography>
                </CardContent>
              </Link>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 4,
                  justifyContent: "center",
                }}
              >
                <IconButton onClick={() => removeFromCart(product._id)}>
                  <RemoveIcon
                    sx={{
                      color: "white",
                      backgroundColor: "#131e36",
                      borderRadius: "50%",
                      p: 1,
                    }}
                  />
                </IconButton>
                <Typography variant="body1" sx={{ mx: 1 }}>
                  {product.quantity}
                </Typography>
                <IconButton onClick={() => addToCart(product)}>
                  <AddIcon
                    sx={{
                      color: "white",
                      backgroundColor: "#131e36",
                      borderRadius: "50%",
                      p: 1,
                    }}
                  />
                </IconButton>
                <IconButton onClick={() => allremoveFromCart(product._id)}>
                  <DeleteIcon sx={{ color: "red", ml: 2 }} />
                </IconButton>
              </Box>
            </Card>
          ))}
          <Box sx={{ display: "flex", justifyContent:"space-between" }}> 

          <Button  component={Link}  to="/products"   variant="contained" sx={{ mt: 2, mb: 4, width:"fit-content", backgroundColor:"green" ,  borderRadius: "8px", boxShadow: 3 }}>
            Continue Shopping
          </Button>

          <Button
            onClick={clearCart}
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#d32f2f" , width: "fit-content" , mb: 4  , borderRadius: "8px"  , boxShadow: 3 , marginRight:24  }}
          >
            Clear Cart
          </Button>
          </Box>
        </Container>
        <TableContainer
          sx={{
            boxShadow: 4,
            height: "fit-content",
            width: "500px",
            borderRadius: "8px",
            marginRight: "70px",
            backgroundColor: "#fff",
            marginBlockStart: "auto",
            mb:4
          }}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6">Subtotal:</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">₹ {total.toFixed(2)}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6">Tax (10%):</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">₹ {taxAmount.toFixed(2)}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h5" fontWeight="bold">
                    Total:
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5" fontWeight="bold">
                    ₹ {grandTotal.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Typography variant="body2" color="success.main">
                    Eligible for Free Shipping 🚚
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Button
                    onClick={handleCheckout}
                    variant="contained"
                    sx={{ mt:1 , backgroundColor: "#131e36" }}
                  
                  >
                  Checkout Now
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </>
  );
};

export default Cart;

