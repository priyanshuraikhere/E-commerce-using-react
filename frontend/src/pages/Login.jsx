import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useCart } from "../context/CartContext";
import { UserContext } from "../context/userContext";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { setToken, setIsLoggedIn, setRole } = useContext(UserContext);
  const { fetchCart } = useCart();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);

      setToken(data.token);
      setIsLoggedIn(true);
      setRole(data.user.role);

      fetchCart();

      toast.success("Login successful!");
      // navigate("/");
      if (data.user.role === "admin") {
        navigate("/addproduct");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailForReset }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      toast.success("Reset link sent to your email!");
      setOpenModal(false);
      setEmailForReset("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{ padding: 4, width: 400, textAlign: "center", borderRadius: 3 }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 1,
                cursor: "pointer",
                color: "#193e8f",
                fontWeight: 500,
                textDecoration: "underline",
              }}
              onClick={() => setOpenModal(true)}
            >
              Forgot Password?
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 2, py: 1, backgroundColor: "#131e36" }}
            >
              Login
            </Button>
          </form>
          <Typography sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Box
              component="span"
              sx={{
                color: "#193e8f",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/signup")}
            >
              Signup
            </Box>
          </Typography>
        </Paper>
      </Box>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter your email"
            fullWidth
            margin="dense"
            value={emailForReset}
            onChange={(e) => setEmailForReset(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleForgotPassword}>
            Send Reset Link
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
