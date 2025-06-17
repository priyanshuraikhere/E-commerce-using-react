import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box } from "@mui/material";  
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
// import Wishlist from "./pages/Wishlist";
import Footer from "./Components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import Success from "./pages/Success";
import ProfileDetails from "./Components/ProfileDetails";
import EditProfile from "./Components/edit-profile";
import { ToastContainer, toast } from "react-toastify";

import ProductDetails from "./pages/productDetails";

import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/userContext";


function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return (
    <>
      <CartProvider>
        <UserProvider>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              {/* <Route path="/wishlist" element={<Wishlist />} /> */}
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/products/:category" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/"
                element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
              />
              <Route path="/success" element={<Success />} />
              <Route path="/profiledetails" element={<ProfileDetails />} />
               <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
            <Footer />
          </Router>
        </Box>
        </UserProvider>
      </CartProvider>
      <ToastContainer position="top-right" autoClose={1000}  style={{marginTop:"52px"}}/>
      
    </>
  );
}

export default App;
