import { Box, Typography, Grid, Link, Divider } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0F172A",
        color: "#F8FAFC",
        py: 4,
        px: { xs: 2, sm: 6 },
        mt: "auto",
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        
        <Grid sx={{ xs:12, sm:4}}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#38BDF8" }}>
            ShopNow
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "#CBD5E1" }}>
            Your one-stop shop for the latest and greatest products.
          </Typography>
        </Grid>

        <Grid sx={{ xs: 12 , sm: 4 }} >
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
          {[ "Products", "Deals", "Contact"].map((label) => (
            <Link
              key={label}
              href={`/${label}`}
              sx={{
                color: "#F8FAFC",
                display: "block",
                mb: 1,
                "&:hover": { color: "#38BDF8" },
              }}
            >
              {label}
            </Link>
          ))}
        </Grid>

       
        <Grid sx={{ xs:12 , sm:3}}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="body2" sx={{ color: "#CBD5E1", mb: 1 }}>
            <EmailIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            <Link
              href="mailto:priyanshuraikhere2002@gmail.com"
              sx={{ color: "#38BDF8" , textDecoration: "none"  }}
            >
              priyanshuraikhere2002@gmail.com
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ color: "#CBD5E1" }}>
            <CallIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            +91 6266350425
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ bgcolor: "#4A5568", my: 2 }} />

      <Typography align="center" variant="body2" sx={{ color: "#A0AEC0" }}>
        © 2025 ShopNow. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
