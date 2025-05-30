import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  CircularProgress,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Box,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../context/CartContext";
import { Link, useParams, useNavigate } from "react-router-dom";

const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showRadio, setShowRadio] = useState(true);
  const [selectedSorting, setSelectedSorting] = useState("default");

  const { cartItems, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        const uniqueCategories = ["all", ...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (category && categories.includes(category)) {
      setSelectedCategory(category);
    } else if (!category) {
      setSelectedCategory("all");
    }
  }, [category, categories]);

  const getQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (selectedSorting === "lowToHigh") return a.price - b.price;
    if (selectedSorting === "highToLow") return b.price - a.price;
    return 0;
  });

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
        <CircularProgress size="5rem" />
      </Container>
    );
  }

  return (
    <>
      <Box sx={{ position: "absolute", mt: "120px", width: "300px", ml: 3 }}>
        <FormControl>
          <Button
            variant="outlined"
            onClick={() => setShowRadio((prev) => !prev)}
            sx={{ textTransform: "none", width: "300px" }}
          >
            Filter by Category
          </Button>

          {showRadio && (
            <RadioGroup
              value={selectedCategory}
              onChange={(e) => {
                const selected = e.target.value;
                setSelectedCategory(selected);
                navigate(selected === "all" ? "/products" : `/products/${encodeURIComponent(selected)}`);
              }}
              sx={{ p: "30px", width: "220px" }}
            >
              {categories.map((cat) => (
                <FormControlLabel
                  key={cat}
                  value={cat}
                  control={<Radio size="small" />}
                  label={cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                />
              ))}
            </RadioGroup>
          )}
        </FormControl>
      </Box>

      <RadioGroup
        value={selectedSorting}
        onChange={(e) => setSelectedSorting(e.target.value)}
        sx={{
          marginTop: "300px",
          position: "absolute",
          top: "180px",
          left: "55px",
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, color: "#1976d2" }}>
          Sorting
        </Typography>
        <FormControlLabel value="default" control={<Radio size="small" />} label="Default" />
        <FormControlLabel value="lowToHigh" control={<Radio size="small" />} label="Price: Low to High" />
        <FormControlLabel value="highToLow" control={<Radio size="small" />} label="Price: High to Low" />
      </RadioGroup>

      <Container sx={{ mt: 4, mr: 8 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 4, color: "#1976d2" }}
        >
          Explore Our Products
        </Typography>

        <Grid container spacing={4} sx={{ justifyContent: "center", alignItems: "center" }}>
          {sortedProducts.map((product) => {
            const quantity = getQuantity(product.id);
            return (
              <Grid sx={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                <Card
                  sx={{
                    minHeight: "380px",
                    maxHeight: "380px",
                    minWidth: "300px",
                    maxWidth: "300px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 4,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.title}
                      sx={{
                        maxHeight: 130,
                        minHeight: 130,
                        width: "60%",
                        objectFit: "contain",
                        p: 2,
                        margin: "0 auto",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.3)",
                        },
                      }}
                    />
                  </Link>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2">{product.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {product.category}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      ₹ {product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {quantity === 0 ? (
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "center", ml: "130px" }}>
                        <IconButton onClick={() => removeFromCart(product.id)}>
                          <RemoveIcon
                            sx={{
                              backgroundColor: "#1976d2",
                              color: "white",
                              borderRadius: "50%",
                              padding: "4px",
                            }}
                          />
                        </IconButton>
                        <Typography variant="body1" sx={{ mx: 1 }}>
                          {quantity}
                        </Typography>
                        <IconButton onClick={() => addToCart(product)}>
                          <AddIcon
                            sx={{
                              backgroundColor: "#1976d2",
                              color: "white",
                              borderRadius: "50%",
                              padding: "4px",
                            }}
                          />
                        </IconButton>
                      </Box>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Products;