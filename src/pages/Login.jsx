import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

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
      alert("Signup successful! Please login.");
      setIsSignup(false);
    } else {
      if (
        storedUser &&
        formData.email === storedUser.email &&
        formData.password === storedUser.password
      ) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");

      } else {
        alert("Invalid credentials");
      }
    }
  };

  return (
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
            color="primary"
            type="submit"
            sx={{ mt: 2, padding: 1 }}
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
        </form>
        <Typography sx={{ marginTop: 2 }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <Box
            component="span"
            sx={{ color: "primary.main", cursor: "pointer", textDecoration: "underline" }}
            onClick={handleToggle}
          >
            {isSignup ? "Login" : "Signup"}
          </Box>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;