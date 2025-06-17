import { useState, useEffect, useContext } from "react";
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
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LoginIcon from "@mui/icons-material/Login";
import PlaceIcon from "@mui/icons-material/Place";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css"

import { UserContext } from "../context/userContext";

function Navbar() {
  const { cartItems } = useCart();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [data, setData] = useState({ location: null, address: "", city: "" });
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username") || "Guest";
  const totalItems = cartItems.length;
  const imageUrl = localStorage.getItem("profileImage");
  const { profileImage } = useContext(UserContext);
  const navigate = useNavigate();

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
            city: result.address?.city || "Unknown",
          });
        } catch {
          setData((prev) => ({ ...prev, city: "Unable to fetch" }));
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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    navigate("/");
    toast.success("Logout successful!");
  };

  const handleSearchSubmit = () => {
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSuggestions([]);
      setSearch("");
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#0f172a", boxShadow: 3 }}>
      <Toolbar sx={{ justifyContent: "space-between", py: 0.3 }}>
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
            marginRight: "130px",
          }}
        >
          <Typography variant="body1">
            <PlaceIcon sx={{ verticalAlign: "middle" }} /> City:{" "}
            {data.city || "Loading..."}
          </Typography>
        </Box>

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
            to="/wishlist"
            color="inherit"
            sx={{ "&.active": { color: "yellow" } }}
          >
            Wishlist
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
                if (e.key === "Enter") handleSearchSubmit();
              }}
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "4px",
                padding: "1px 8px",
                width: "450px",
              }}
              endAdornment={
                <IconButton
                  sx={{ color: "white" }}
                  onClick={handleSearchSubmit}
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

          {isLoggedIn ? (
            <>
              {/* <Box
                onClick={handleMenuOpen}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  ml: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    mr: 1,
                    bgcolor: imageUrl ? "transparent" : "#193e8f",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  src={profileImage || undefined}
                >
                  {!imageUrl && username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography color="white" fontWeight="bold">
                  {username}
                </Typography>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/ProfileDetails");
                    handleMenuClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/account");
                    handleMenuClose();
                  }}
                >
                  Account
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleMenuClose();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu> */}

              <Box className="dropdown-hover" sx={{ ml: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      mr: 1,
                      bgcolor: imageUrl ? "transparent" : "#193e8f",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                    src={profileImage || undefined}
                  >
                    {!imageUrl && username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography color="white" fontWeight="bold">
                    {username}
                  </Typography>
                </Box>

                <Box className="dropdown-content">
                  <Box
                    className="dropdown-item"
                    onClick={() => navigate("/ProfileDetails")}
                  >
                    Profile
                  </Box>
                  <Box
                    className="dropdown-item"
                    onClick={() => navigate("/account")}
                  >
                    Account
                  </Box>
                  <Box className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <Button
              component={NavLink}
              to="/login"
              color="inherit"
              sx={{ fontWeight: "bold" }}
            >
              Login <LoginIcon sx={{ verticalAlign: "middle", ml: 1 }} />
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
