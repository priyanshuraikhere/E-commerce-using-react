import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    district: "",
    pincode: "",
    profileImage: null,
  });

  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:5000/api/auth/signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       toast.success("Signup successful! Please login.");
  //       navigate("/login");
  //     } else {
  //       toast.error(data.message || "Signup failed");
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong during signup");
  //   }
  // };



  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  for (const key in formData) {
    data.append(key, formData[key]);
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      body: data,
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } else {
      toast.error(result.message || "Signup failed");
    }
  } catch (error) {
    toast.error("Something went wrong during signup");
  }
};

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 4, width: "40%", height: "100%", borderRadius: 3 }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Create Your Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} sx={{ width: "45%" }}>
              <TextField
                label="First Name"
                fullWidth
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ width: "45%" }}>
              <TextField
                label="Last Name"
                fullWidth
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ width: "45%" }}>
              <TextField
                label="Username"
                fullWidth
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ width: "45%" }}>
              <TextField
                label="Email"
                fullWidth
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ width: "45%" }}>
              <TextField
                label="Password"
                fullWidth
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ width: "45%" }}>
              <TextField
                label="Gender"
                select
                fullWidth
                required
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ width: "45%" }}>
              <TextField
                label="Age"
                fullWidth
                required
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ width: "45%" }}>
              <TextField
                label="Phone Number"
                fullWidth
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ width: "45%" }}>
              <TextField
                label="Address Line 1"
                fullWidth
                required
                value={formData.addressLine1}
                onChange={(e) =>
                  setFormData({ ...formData, addressLine1: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ width: "45%" }}>
              <TextField
                label="Address Line 2"
                fullWidth
                required
                value={formData.addressLine2}
                onChange={(e) =>
                  setFormData({ ...formData, addressLine2: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ width: "45%" }}>
              <TextField
                label="State"
                fullWidth
                required
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ width: "45%" }}>
              <TextField
                label="District"
                fullWidth
                required
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ width: "45%" }}>
              <TextField
                label="Pincode"
                fullWidth
                required
                type="number"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({ ...formData, pincode: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ width: "35%" }}>
              <Button variant="contained" component="label" fullWidth>
                Upload Profile Picture
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profileImage: e.target.files[0],
                    })
                  }
                />
              </Button>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              py: 1.4,
              fontSize: "16px",
              backgroundColor: "#0f172a",
              width: "450px",
              marginLeft: "75px",
            }}
          >
            Signup
          </Button>
        </form>

        <Typography sx={{ mt: 2, textAlign: "center" }}>
          Already have an account?
          <Box
            component="span"
            sx={{
              color: "#1d4ed8",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Box>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
