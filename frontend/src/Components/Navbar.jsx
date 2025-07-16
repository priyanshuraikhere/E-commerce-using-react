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
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LoginIcon from "@mui/icons-material/Login";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";
import { UserContext } from "../context/userContext";

function Navbar() {
  const { cartItems, clearBadge } = useCart();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const totalItems = cartItems.length;

  const {
    profileImage,
    firstname,
    setProfileImage,
    setFirstname,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
    role,
  } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
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
    localStorage.removeItem("token");
    setFirstname("");
    setProfileImage("");
    setToken(null);
    clearBadge();
    setIsLoggedIn(false);
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
          ShopNow <StorefrontIcon sx={{ verticalAlign: "middle", ml: 1 }} />
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

      
          {role === "admin" && (
            <>
              <Button
                component={NavLink}
                to="/addproduct"
                color="inherit"
                sx={{ "&.active": { color: "yellow" } }}
              >
                Add Product
              </Button>
              <Button
                component={NavLink}
                to="/allproducts"
                color="inherit"
                sx={{ "&.active": { color: "yellow" } }}
              >
                All Products
              </Button>
              <Button
                component={NavLink}
                to="/allusers"
                color="inherit"
                sx={{ "&.active": { color: "yellow" } }}
              >
                User Dashboard
              </Button>
            </>
          )}

          
          {role !== "admin" && (
            <>
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
            </>
          )}

          

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
                <IconButton sx={{ color: "white" }} onClick={handleSearchSubmit}>
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
                    key={product._id}
                    onClick={() => {
                      navigate(`/product/${product._id}`);
                      setSearch("");
                      setSuggestions([]);
                    }}
                    sx={{
                      px: 2,
                      py: 1,
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f0f0f0" },
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
            <Box className="dropdown-hover" sx={{ ml: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <Avatar
                  sx={{ width: 36, height: 36, mr: 1, fontSize: "16px", fontWeight: "bold" }}
                  src={profileImage}
                />
                <Typography color="white" fontWeight="bold" >
                  {firstname}
                </Typography>
              </Box>
              <Box className="dropdown-content">
                <Box className="dropdown-item" onClick={() => navigate("/profiledetails")}>
                  Profile
                </Box>
                <Box className="dropdown-item" onClick={() => navigate("/edit-profile")}>
                  Edit Profile
                </Box>
                <Box className="dropdown-item" onClick={handleLogout}>
                  Logout
                </Box>
              </Box>
            </Box>
          ) : (
            <Button component={NavLink} to="/login" color="inherit" sx={{ fontWeight: "bold" }}>
              Login <LoginIcon sx={{ verticalAlign: "middle", ml: 1 }} />
            </Button>
          )}

          {role !== "admin" && (

          <IconButton component={NavLink} to="/cart" color="inherit">
            <Badge badgeContent={totalItems} color="warning">
              <ShoppingCart />
            </Badge>
          </IconButton>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
