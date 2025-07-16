import React from "react";
import { Typography, Box } from "@mui/material";

const Unauthorized = () => (
  <Box sx={{display:"flex" , flexDirection:"column" , textAlign:"center" , justifyContent:"center" , height:"100vh" , backgroundColor:"#202124"}}>
    <Typography variant="h4" color="#9aa0a6">
      403 - Unauthorized Access
    </Typography>
    <Typography color="#9aa0a6">Please login with proper permissions.</Typography>
  </Box>
);

export default Unauthorized;
