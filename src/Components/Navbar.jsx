import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Badge,
  Stack,
  TextField,
  InputBase
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { cartItems } = useCart();
  const totalItems = cartItems.length;
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    window.location.reload();
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#0f172a", boxShadow: 3 }}>
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="white"
          component={NavLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          ShopNow
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            component={NavLink}
            to="/"
            color="inherit"
            sx={{ "&.active": { color: "yellow" } }}
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
            sx={{ "&.active": { color: "yellow" } }}
          >
            Deals
          </Button>
          <Button
            component={NavLink}
            to="/contact"
            color="inherit"
            sx={{ "&.active": { color: "yellow" } }}
          >
            Contacts
          </Button>

          <InputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            sx={{
              color: 'white', 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              padding: '4px 8px',
            }}
          />
          <IconButton color="inherit" aria-label="search">
            <SearchIcon />
          </IconButton>

          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{ fontWeight: "bold" }}
            >
              Logout
            </Button>
          ) : (
            <Button
              component={NavLink}
              to="/login"
              color="inherit"
              sx={{ fontWeight: "bold" }}
            >
              Login
            </Button>
          )}

          <IconButton component={NavLink} to="/cart" color="inherit">
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
