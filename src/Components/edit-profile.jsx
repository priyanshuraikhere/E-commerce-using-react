import React, { useState, useEffect } from "react";
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Alert,
  Tabs,
  Tab,
  Grid,
  Divider,
  CircularProgress
} from "@mui/material";

const EditProfile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userId, setUserId] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);

   
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
    age: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    district: "",
    pincode: "",

  });


  const [passwordData, setPasswordData] = useState({ 
    currentPassword: "", 
    newPassword: "", 
    confirmPassword: "" 
  });

  // Get user ID from token and load profile data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload.id);
        loadUserProfile(payload.id);
      } catch (err) {
        console.error("Error decoding token:", err);
        setError("Invalid authentication token");
      }
    }
  }, []);

  const loadUserProfile = async (id) => {
    setLoadingProfile(true);
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setProfileData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          username: userData.username || "",
          email: userData.email || "",
          gender: userData.gender || "",
          age: userData.age || "",
          phone: userData.phone || "",
          addressLine1: userData.addressLine1 || "",
          addressLine2: userData.addressLine2 || "",
          state: userData.state || "",
          district: userData.district || "" ,
          pincode: userData.pincode || ""
        });
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError("");
    setSuccess("");
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validateProfileForm = () => {
    if (!profileData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!profileData.email.trim()) {
      setError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (profileData.phone && profileData.phone.length < 10) {
      setError("Phone number must be at least 10 digits");
      return false;
    }
    return true;
  };

  const validatePasswordForm = () => {
    if (!passwordData.currentPassword) {
      setError("Current password is required");
      return false;
    }
    if (!passwordData.newPassword) {
      setError("New password is required");
      return false;
    }
    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return false;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New password and confirm password do not match");
      return false;
    }
    if (passwordData.currentPassword === passwordData.newPassword) {
      setError("New password must be different from current password");
      return false;
    }
    return true;
  };

  const handleSaveProfile = async () => {
    if (!validateProfileForm() || !userId) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Profile update failed");
      }

      setSuccess(data.message || "Profile updated successfully!");
      
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async () => {
    if (!validatePasswordForm() || !userId) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Password update failed");
      }

      setSuccess(data.message || "Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (err) {
      console.error("Error updating password:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (tabValue === 0) {
      loadUserProfile(userId); 
    } else {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }
    setError("");
    setSuccess("");
  };

  if (loadingProfile) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 , mb:5 }}>
      <Paper elevation={6} sx={{ borderRadius: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Profile Information" />
            <Tab label="Change Password" />
          </Tabs>
        </Box>

        <Box sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

        
          {tabValue === 0 && (
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                Profile Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    label="First Name"
                    fullWidth
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    disabled={loading}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="username"
                    label="Username"
                    fullWidth
                    value={profileData.username}
                    onChange={handleProfileChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={profileData.email}
                    onChange={handleProfileChange}
                    disabled={loading}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="gender"
                    label="Gender"
                    fullWidth
                    value={profileData.gender}
                    onChange={handleProfileChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="age"
                    label="Age"
                    fullWidth
                    value={profileData.age}
                    onChange={handleProfileChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="phone"
                    label="Phone Number"
                    fullWidth
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="pincode"
                    label="PIN Code"
                    fullWidth
                    value={profileData.pincode}
                    onChange={handleProfileChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  
                    name="addressLine1"
                    label="Address Line 1"
                    fullWidth
                    value={profileData.addressLine1}
                    onChange={handleProfileChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="addressLine2"
                    label="Address Line 2"
                    fullWidth
                    value={profileData.addressLine2}
                    onChange={handleProfileChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="district"
                    label="District"
                    fullWidth
                    value={profileData.district}
                    onChange={handleProfileChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="state"
                    label="State"
                    fullWidth
                    value={profileData.state}
                    onChange={handleProfileChange}
                    disabled={loading}
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  color="success" 
                  onClick={handleSaveProfile}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Save Changes"}
                </Button>
              </Box>
            </Box>
          )}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                Change Password
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="currentPassword"
                    label="Current Password"
                    type="password"
                    fullWidth
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    disabled={loading}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="newPassword"
                    label="New Password"
                    fullWidth
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    disabled={loading}
                    helperText="Password must be at least 6 characters long"
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="confirmPassword"
                    label="Confirm New Password"
                    fullWidth
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    disabled={loading}
                    required
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  color="success" 
                  onClick={handleSavePassword}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default EditProfile;
