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
import Deals from "./pages/Deals";
import Footer from "./Components/Footer";
import Login from "./pages/Login";
import Success from "./pages/success";
import { ToastContainer, toast } from "react-toastify";

import ProductDetails from "./pages/productDetails";
import { CartProvider } from "./context/CartContext";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return (
    <>
      <CartProvider>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/products/:category" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
              />
              <Route path="/success" element={<Success />} />
            </Routes>
            <Footer />
          </Router>
        </Box>
      </CartProvider>
      <ToastContainer position="top-right" autoClose={1000} />
      
    </>
  );
}

export default App;
