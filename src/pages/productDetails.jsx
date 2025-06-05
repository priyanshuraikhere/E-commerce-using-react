import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  CircularProgress,
  CardActions,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { useCart } from "../context/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const { addToCart } = useCart();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <CircularProgress size="5rem"  sx={{ color: "#15213d" }} />
      </Container>
    );
  }
  return (
    <>
    
   
      <Button
        variant="outlined"
        sx={{ mt:2 , ml:4 ,width:"100px" }}
        onClick={() => navigate("/products")}
      >
      <KeyboardBackspaceIcon sx={{ mr: 1 }} />
      Back
      </Button>
    <Container maxWidth="md" sx={{ mt: 4 , mb:8}}>
      <Card sx={{ display: "flex", flexDirection: "column", boxShadow: 4 }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: "contain", maxHeight: 300 }}
        />
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Category: {product.category}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Rating
              name="read-only-rating"
              value={product.rating.rate}
              readOnly
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({product.rating.count} reviews)
            </Typography>
          </Box>
          <Typography variant="h6"  sx={{ mt: 2 , color:"#1a2949"}}>
            ₹{product.price}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {product.description}
          </Typography>
          
          <CardActions>
            {!addedToCart ? (
              <Button
                size="small"
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                onClick={() => {
                  addToCart(product);
                  setAddedToCart(true);
                }}
                sx={{ mt: 4  , backgroundColor:"#131e36"}}
              >
                Add to Cart
              </Button>
            ) : (
              <Button
                size="small"
                variant="outlined"
                color="success"
                onClick={() => navigate("/cart")}
                sx={{ mt: 4 }}
              >
                Go to Cart
              </Button>
            )}
          </CardActions>

        </CardContent>
      </Card>
    </Container>
     </>
  );
}

export default ProductDetails;
