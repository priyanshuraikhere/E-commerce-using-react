import { Box, Typography, Grid, Link, Divider } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#0F172A",
        color: "#F8FAFC",
        py: 4,
        mt: 6,   
        padding: "40px"
      }}
    >
      <Grid container spacing={4} justifyContent="space-around">
        <Grid>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#38BDF8" }}
          >
            ShopNow
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "#CBD5E1" }}>
            Your one-stop shop for the latest and greatest products.
          </Typography>
        </Grid>

        <Grid>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Quick Links
          </Typography>
          <Link
            href="/"
            sx={{
              color: "#F8FAFC",
              display: "block",
              mb: 1,
              "&:hover": { color: "#38BDF8" },
            }}
          >
            Home
          </Link>
          <Link
            href="/products"
            sx={{
              color: "#F8FAFC",
              display: "block",
              mb: 1,
              "&:hover": { color: "#38BDF8" },
            }}
          >
            Products
          </Link>
          <Link
            href="/deals"
            sx={{
              color: "#F8FAFC",
              display: "block",
              mb: 1,
              "&:hover": { color: "#38BDF8" },
            }}
          >
            Deals
          </Link>
          <Link
            href="/contact"
            sx={{
              color: "#F8FAFC",
              display: "block",
              "&:hover": { color: "#38BDF8" },
            }}
          >
            Contact
          </Link>
        </Grid>

        <Grid>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="body2" sx={{ color: "#CBD5E1", mb: 1 }}>
            Email:
            <Link
              href="mailto:priyanshuraikhere2002@gmail.com"
              sx={{ color: "#38BDF8" }}
            >
              priyanshuraikhere2002@gmail.com
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ color: "#CBD5E1" }}>
            Phone: +91 98765 43210
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ bgcolor: "#4A5568", my: 4 }} />

      <Typography align="center" variant="body2" sx={{ color: "#A0AEC0" }}>
        © 2025 ShopNow. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
