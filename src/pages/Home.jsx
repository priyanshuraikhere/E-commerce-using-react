import React from "react";
import {
  Typography,
  Container,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";

const categoryData = [
  {
    title: "Men's Clothing",
    img: "https://5.imimg.com/data5/SELLER/Default/2021/7/ZW/DY/RA/133215290/mens-wear.jpg",
    path: "men's clothing",
  },
  {
    title: "Women's Clothing",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQESNfg1BGi_wnfbh8IfNWyvKrl98rLwjeEIg&s",
    path: "women's clothing",
  },
  {
    title: "Electronics",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNhzvzKJxLjowcveny5ehUQq-mTXPpIg_8PA&s",
    path: "electronics",
  },
  {
    title: "Jewelery",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQtxWDTaz3L0xQNC1FwcDWgocBqqVD-28Bg&s",
    path: "jewelery",
  },
];

const Home = () => {
  
  return (
    <>
      
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://img.freepik.com/premium-photo/toy-shopping-cart-with-boxes-credit-card-with-copy-space_339191-197.jpg?semt=ais_hybrid&w=740')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            fontWeight="bold"
            color="white"
            gutterBottom
            sx={{ textShadow: "1px 1px 6px rgba(0,0,0,0.7)" }}
          >
            Welcome to ShopNow
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: "white",
              textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
            }}
          >
            Discover exclusive deals and premium products crafted just for you.
          </Typography>
          <Link to="/products">
            <Button size="large" variant="contained" color="secondary">
              Shop Now
            </Button>
          </Link>
        </Container>
      </Box>

      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Why Shop With Us?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              title: "Free Shipping",
              desc: "On orders above ₹999",
              icon: "🚚",
            },
            {
              title: "24/7 Support",
              desc: "Always available for you",
              icon: "📞",
            },
            {
              title: "Secure Payment",
              desc: "100% safe and secure checkout",
              icon: "🔒",
            },
          ].map((item, index) => (
            <Grid sx={{ item: { xs: 12, md: 4 } }} key={index}>
              <Card
                sx={{
                  p: 3,
                  textAlign: "center",
                  height: "100%",
                  boxShadow: 4,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Typography fontSize="40px">{item.icon}</Typography>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography color="text.secondary">{item.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "#f5f5f5", py: 6 }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Explore Our Categories
          </Typography>
          <Grid
            container
            spacing={4}
            sx={{ mt: 4, alignItems: "center", justifyContent: "center" }}
          >
            {categoryData.map((cat, i) => (
              <Grid sx={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Link
                  to={`/products/${encodeURIComponent(cat.path)}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${cat.img})`,
                      height: 250,
                      width: 200,
                      borderRadius: 2,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      fontWeight: "bold",
                      fontSize: "26px",
                      boxShadow: 4,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                      },
                      textAlign: "center",
                      px: 2,
                    }}
                  >
                    {cat.title}
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
