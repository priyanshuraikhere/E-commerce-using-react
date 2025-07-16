import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  Button,
  IconButton,
  Input,
  CircularProgress,
  Box,
  Menu
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { jwtDecode } from "jwt-decode";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { UserContext } from "../context/userContext";

const ProfileDetails = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const { setProfileImage } = useContext(UserContext);
  const [openImage, setOpenImage] = useState(false);



  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoadingProfile(false);
      return;
    }

    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUserData(data);
    setLoadingProfile(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const formData = new FormData();
    formData.append("profileImage", file);

    const res = await fetch(
      `http://localhost:5000/api/users/${userId}/profile-image`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    if (res.ok) {
      const updated = await res.json();
      setUserData(updated.user);
      setProfileImage(
        `http://localhost:5000/uploads/${updated.user.profileImage}`
      );
    }
  };

  const DeleteProfileImage = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const res = await fetch(
      `http://localhost:5000/api/users/${userId}/profile-image`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      const updated = await res.json();
      setUserData(updated.user);
      setProfileImage("");
    }
  };
  if (loadingProfile) {
    return (
      <Container
        maxWidth="sm"
        sx={{ mt: 5, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress size="5rem" sx={{ color: "#15213d" }} />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mx: "auto",
              mb: 2,
              cursor: "pointer",
              border: "2px solid gray",
            }}
            src={
              userData.profileImage
                ? `http://localhost:5000/uploads/${userData.profileImage}`
                : `https://via.placeholder.com/100?text=${
                    userData?.firstName?.[0] || "U"
                  }`
            }
            onClick={() => setOpenImage(true)}
          />

          <label htmlFor="profile-image-upload">
            <IconButton
              component="span"
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                backgroundColor: "#fff",

                "&:hover": {
                  backgroundColor: "#fff",
                  opacity: 1,
                },
              }}
            >
              <EditIcon fontSize="medium" sx={{ color: "black" }} />
            </IconButton>
          </label>
          <Input
            id="profile-image-upload"
            type="file"
            sx={{ display: "none", backgroundColor: "#fff" }}
            onChange={handleImageChange}
          />
        </div>

        {openImage && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1300,
              flexDirection: "column",
            
            }}
            onClick={() => setOpenImage(false)}
          >
            <Box
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                
                
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                style={{
                  backgroundColor: "#fff",
                  height: "250px",
                  width: "250px",
                  borderRadius: "50%",
                  objectFit: "cover",
                
                }}
                src={
                  userData.profileImage
                    ? `http://localhost:5000/uploads/${userData.profileImage}`
                    : `https://via.placeholder.com/250?text=${
                        userData?.firstName?.[0] || "U"
                      }`
                }
                alt="Profile"
              />
              <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                <IconButton sx={{ backgroundColor: "#fff" }} onClick={() => setOpenImage(false)}>
                  <CloseIcon
                    sx={{  color: "black" }}
                  />
                </IconButton>
                <IconButton sx={{ backgroundColor: "#fff" }} onClick={DeleteProfileImage}>
                  <DeleteIcon   sx={{ color: "red"  }} />
                </IconButton>
                <label htmlFor="profile-image-upload-modal">
                  <IconButton component="span" sx={{ backgroundColor: "#fff" }}>
                    <EditIcon sx={{ color: "black", }} />
                  </IconButton>
                </label>
                <Input
                  id="profile-image-upload-modal"
                  type="file"
                  sx={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </Box>
            </Box>
          </Box>
        )}

        <Typography variant="h4" fontWeight="bold" color="#15213d">
          {userData?.firstName} {userData?.lastName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          @{userData?.username}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <Typography>
              <strong>Email:</strong> {userData?.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Phone:</strong> {userData?.phone}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Address:</strong> {userData?.addressLine1}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Location:</strong> {userData?.district}{" "}
              {userData?.pincode} ,{userData?.state}
            </Typography>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4, backgroundColor: "#15213d" }}
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </Button>
      </Paper>
    </Container>
  );
};

export default ProfileDetails;
