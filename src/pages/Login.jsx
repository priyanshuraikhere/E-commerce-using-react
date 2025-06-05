import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignup(!isSignup);
    setFormData({ email: "", password: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (isSignup) {
      localStorage.setItem("user", JSON.stringify(formData));
      toast.success("Signup successful! Please login.");
      setIsSignup(false);
    } else {
      if (
        storedUser &&
        formData.email === storedUser.email &&
        formData.password === storedUser.password
      ) {
        localStorage.setItem("isLoggedIn", "true");
           toast.success("Login successful!");
        navigate("/");

      } else {
         toast.error("Invalid credentials");
      }
    }
  };

  return (
    <> 
   
    
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper elevation={3} sx={{ padding: 4, width: 400, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          {isSignup ? "Signup" : "Login"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            type="email"
            label="Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
            label="Password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Button
            fullWidth
            variant="contained"
            
            type="submit"
            sx={{ mt: 2, padding: 1 , backgroundColor:"#131e36" }}
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
        </form>
        <Typography sx={{ marginTop: 2 }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <Box
            component="span"
            sx={{ color: "#193e8f", cursor: "pointer", textDecoration: "underline" }}
            onClick={handleToggle}
          >
            {isSignup ? "Login" : "Signup"}
          </Box>
        </Typography>
      </Paper>
    </Box>
     </>
  );
};

export default Login;