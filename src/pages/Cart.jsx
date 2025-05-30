import { useCart } from "../context/CartContext";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, Navigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, total, addToCart, allremoveFromCart } =
    useCart();
  const TAX_RATE = 0.1;
  const taxAmount = total * TAX_RATE;
  const grandTotal = total + taxAmount;

  if (cartItems.length === 0) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h5">Your cart is empty 😔</Typography>
      </Container>
    );
  }

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ mt: 8 }}>
        Shopping Cart
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Container sx={{ mt: 4, display: "flex", flexDirection: "column", width: "100%", maxWidth: "950px" }}>
          {cartItems.map((product) => (
            <Card
              key={product.id}
              sx={{
                display: "flex",
                mb: 3,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
                width: "100%",
                maxWidth: "950px",
              }}
            >
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: "none", display: "flex", alignItems: "center", flexGrow: 1 }}
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
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
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
                  <Typography variant="subtitle1">{product.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category}
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    ₹ {product.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Link>
              <Box sx={{ display: "flex", alignItems: "center", px: 4, justifyContent: "center" }}>
                <IconButton onClick={() => removeFromCart(product.id)}>
                  <RemoveIcon
                    sx={{
                      color: "white",
                      backgroundColor: "#1976d2",
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
                      backgroundColor: "#1976d2",
                      borderRadius: "50%",
                      p: 1,
                    }}
                  />
                </IconButton>
                <IconButton onClick={() => allremoveFromCart(product.id)}>
                  <DeleteIcon sx={{ color: "red", ml: 2 }} />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Container>
        <TableContainer
          sx={{
            boxShadow: 4,
            height:"100%",       
            width: "350px",
            borderRadius: "8px",           
           marginBlockStart: 'auto',
            marginRight:"auto"
            
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
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Cart;