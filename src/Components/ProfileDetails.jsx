import React, { useEffect, useState , useContext} from "react";
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
  CircularProgress
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import EditIcon from "@mui/icons-material/Edit";
import { UserContext } from "../context/userContext";

const ProfileDetails = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  
  const { setProfileImage } = useContext(UserContext);

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

    const res = await fetch(`http://localhost:5000/api/users/${userId}/profile-image`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (res.ok) {
      const updated = await res.json();
      setUserData(updated.user);
      setProfileImage(`http://localhost:5000/uploads/${updated.user.profileImage}`);
    }
  };
     if (loadingProfile) {
        return (
          <Container maxWidth="sm" sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Container>
        );
      }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <Avatar
            sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
            src={
              userData.profileImage
                ? `http://localhost:5000/uploads/${userData.profileImage}`
                : `https://via.placeholder.com/100?text=${userData?.firstName?.[0] || "U"}`
            }
          />
          <label htmlFor="profile-image-upload">
            <IconButton
              component="span"
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                backgroundColor: "#fff",
                
                }}
            >
              <EditIcon fontSize="medium" />
            </IconButton>
          </label>
          <Input
            id="profile-image-upload"
            type="file"
            sx={{ display: "none" , backgroundColor: "#fff"  }}
            onChange={handleImageChange}
          />
        </div>

        <Typography variant="h4" fontWeight="bold" color="primary">
          {userData?.firstName} {userData?.lastName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          @{userData?.username}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <Typography  >
              <strong>Email:</strong> {userData?.email} 
            </Typography>
          </Grid>
          <Grid item xs={12} >
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
              <strong>Location:</strong>  {userData?.district} {userData?.pincode} ,{userData?.state}
            </Typography>
          </Grid>
        </Grid>
          <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={() => navigate("/edit-profile")}>
          Edit Profile
         </Button>
      </Paper>
    </Container>
  );
};

export default ProfileDetails;