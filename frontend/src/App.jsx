import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import Footer from "./Components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import ProfileDetails from "./Components/ProfileDetails";
import EditProfile from "./Components/edit-profile";
import { ToastContainer, toast } from "react-toastify";
import ProductDetails from "./pages/productDetails";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/userContext";
import Addproduct from "./admin/AddProduct";
import Allproduct from "./admin/Allproduct";
import { useLocation } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";
import Unauthorized from "./pages/unauthorized";
import Protected from "./pages/protected";
import Allusers from "./admin/allusers"
function App() {
  const location = window.location;
  const [showNavbarFooter, setShowNavbarFooter] = useState(true);

  useEffect(() => {
    if (location.pathname === "/404" || location.pathname === "/unauthorized") {
      setShowNavbarFooter(false);
    } else {
      setShowNavbarFooter(true);
    }
  }, [location]);
  // console.log("location" , location)
  return (
    <>
      <UserProvider>
        <CartProvider>
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <Router>
              <ScrollToTop />

              {showNavbarFooter && <Navbar />}
              <Routes>
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/success" element={<Success />} />
                <Route path="/profiledetails" element={<ProfileDetails />} />
                <Route path="/edit-profile" element={<EditProfile />} />

                <Route
                  path="/addproduct"
                  element={
                    <Protected allowedRoles={["admin"]}>
                      {showNavbarFooter && <Addproduct />}
                    </Protected>
                  }
                />

                <Route path="/unauthorized" element={<Unauthorized />} />

                <Route
                  path="/allproducts"
                  element={
                    <Protected allowedRoles={["admin"]}>
                      {showNavbarFooter && <Allproduct />}
                    </Protected>
                  }
                />
                <Route path="/allusers" element={<Allusers />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
              </Routes>
              {showNavbarFooter && <Footer />}
            </Router>
          </Box>
        </CartProvider>
      </UserProvider>
      <ToastContainer
        position="top-right"
        autoClose={800}
        style={{ marginTop: "52px" }}
      />
    </>
  );
}

function NotFound() {
  const HomePage = () => {
    window.location.href = "/";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#202124",
      }}
    >
      <Typography variant="h4" color="#9aa0a6">
        404 - page not found
      </Typography>
      <Typography color="#9aa0a6">
        The page you were looking for does not exist.
      </Typography>
      <Button
        sx={{ color: "#9aa0a6", backgroundColor: "#4a4949", mt: 2 }}
        onClick={HomePage}
      >
        {" "}
        reload{" "}
      </Button>
    </Box>
  );
}

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

export default App;
