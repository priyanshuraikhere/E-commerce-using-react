import { useState, useEffect } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Badge,
  Stack,
  InputBase,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PlaceIcon from '@mui/icons-material/Place';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const { cartItems } = useCart();

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [data, setData] = useState({ location: null, address: "", city: "" });

  useEffect(() => {
    const getLocationAndAddress = async () => {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
          );
          const result = await res.json();
          setData({
            location: coords,
            address: result.display_name,
            city: result.address?.city,
          });
        } catch {
          setData("Failed to fetch address");
        }
      });
    };
    getLocationAndAddress();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
      return;
    }

    const lowerQuery = search.toLowerCase();
    const matched = allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
    setSuggestions(matched.slice(0, 20));
  }, [search, allProducts]);

  const totalItems = cartItems.length;

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    toast.success("Logout successful!");
   
    // window.location.reload();
  };

  const handleSearchSubmit = () => {
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSuggestions([]);
      setSearch("");
    }
  };

  return (
  
    
     
    <AppBar position="sticky" sx={{ backgroundColor: "#0f172a", boxShadow: 3 }}>
      <Toolbar sx={{ justifyContent: "space-between", py:0.3  }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="white"
          component={NavLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          ShopNow
          <StorefrontIcon sx={{ verticalAlign: "middle", ml: 1 }} />
        </Typography>

        <Box
          sx={{
            p: 0.5,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            borderRadius: 2,
            marginRight: "80px",
          }}
        >
          <Typography variant="body1">
            
            <PlaceIcon sx={{ verticalAlign: "middle" }} /> City: {data.city}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            component={NavLink}
            to="/"
            color="inherit"
            sx={{ "&.active": { color: "yellow"  } }}
          >
            Home
          </Button>
          <Button
            component={NavLink}
            to="/products"
            color="inherit"
            sx={{ "&.active": { color: "yellow" } }}
          >
            Products
          </Button>
          <Button
            component={NavLink}
            to="/deals"
            color="inherit"
            sx={{ "&.active": {  color: "yellow" } }}
          >
            Deals
          </Button>
          <Button
            component={NavLink}
            to="/contact"
            color="inherit"
            sx={{ "&.active": { color: "yellow" } }}
          >
            Contact
          </Button>

          <Box sx={{ position: "relative" }}>
            <InputBase
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
              inputProps={{ "aria-label": "search" }}
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "4px",
                padding: "1px 8px",
                width: "550px",
              }}
              endAdornment={
                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => {
                    handleSearchSubmit();
                  }}
                >
                  <SearchIcon />
                </IconButton>
              }
            />

            {suggestions?.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "40px",
                  left: 0,
                  backgroundColor: "white",
                  color: "black",
                  zIndex: 999,
                  width: "100%",
                  borderRadius: 1,
                  boxShadow: 3,
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {suggestions.map((product) => (
                  <Box
                    key={product.id}
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      setSearch("");
                      setSuggestions([]);
                    }}
                    sx={{
                      px: 2,
                      py: 1,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  >
                    <Typography variant="subtitle2">{product.title}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {product.category}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {!isLoggedIn ? (
            <Button
              component={NavLink}
              to="/login"
              color="inherit"
              sx={{ fontWeight: "bold" }}
            >
              Login <LoginIcon sx={{ verticalAlign: "middle", ml: 1 }} />
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{ fontWeight: "bold" }}
            >
              Logout <LogoutIcon sx={{ verticalAlign: "middle", ml: 1 }} />
            </Button>
          )}

          <IconButton component={NavLink} to="/cart" color="inherit">
            <Badge badgeContent={totalItems} color="warning">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Stack>
   

      </Toolbar>
    </AppBar>
  
  );
}

export default Navbar;