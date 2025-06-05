
// import React, { useEffect, useState } from "react";
// import {
//   Grid,
//   Container,
//   CircularProgress,
//   Typography,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Button,
// } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { useCart } from "../context/CartContext";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("https://fakestoreapi.com/products");
//         const data = await res.json();
//         setProducts(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   if (loading) {
//     return (
//       <Container
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           height: "100vh",
//           alignItems: "center",
//         }}
//       >
//         <CircularProgress size="5rem" />
//       </Container>
//     );
//   }
//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography
//         variant="h4"
//         gutterBottom
//         textAlign="center"
//         fontWeight="bold"
//       >
//         Explore Our Products
//       </Typography>
//       <Grid
//         container
//         spacing={4}
//         sx={{ justifyContent: "center", alignItems: "center" }}
//       >
//         {products.map((product) => (
//           <Grid sx={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
//             <Card
//               sx={{
//                 minHeight: "360px",
//                 maxHeight: "360px",
//                 minWidth: "300px",
//                 maxWidth: "300px",
//                 display: "flex",
//                 flexDirection: "column",
//                 boxShadow: 4,
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                   transition: "transform 0.3s ease-in-out",
//                 },
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 image={product.image}
//                 alt={product.title}
//                 sx={{
//                   maxHeight: 130,
//                   minHeight: 130,
//                   width: "60%",
//                   objectFit: "contain",
//                   p: 2,
//                   alignItems: "center",
//                   margin: "0 auto",
//                   "&:hover": {
//                     transform: "scale(1.3)",
//                     transition: "transform 0.3s ease-in-out",
//                   },
//                 }}
//               />
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography variant="subtitle2">{product.title}</Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mb: 1 }}
//                 >
//                   {product.category}
//                 </Typography>
//                 <Typography variant="body1" fontWeight="bold">
//                   ₹ {product.price.toFixed(2)}
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button
//                   size="small"
//                   variant="contained"
//                   startIcon={<ShoppingCartIcon />}
//                   onClick={() => addToCart(product)}

//                 >
//                   Add to Cart
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Products;



 {/* <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mt: 3 
            }}
          >
            <IconButton
              color="primary"
              onClick={() => setQuantity(q => Math.max(q - 1, 1))}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6" sx={{ mx: 2 }}>
              {quantity}
            </Typography>
            <IconButton
              color="primary"
              onClick={() => setQuantity(q => q + 1)}
            >
              <AddIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 3 }}
              onClick={() => console.log(`Add to cart: ${product.title} (Qty: ${quantity})`)}
            >
              Add to Cart
            </Button>
          </Box> */}





          //navbar

          







// import { useState, useEffect } from "react";

// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Box,
//   Badge,
//   Stack,
//   InputBase,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { ShoppingCart } from "@mui/icons-material";
// import SearchIcon from "@mui/icons-material/Search";
// import { NavLink } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import LoginIcon from "@mui/icons-material/Login";
// import LogoutIcon from "@mui/icons-material/Logout";
// import PlaceIcon from "@mui/icons-material/Place";

// function Navbar() {
//   const { cartItems } = useCart();

//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);

//   const [data, setData] = useState({ location: null, address: "", city: "" });

//   useEffect(() => {
//     const getLocationAndAddress = async () => {
//       if (!navigator.geolocation) return;
//       navigator.geolocation.getCurrentPosition(async ({ coords }) => {
//         try {
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
//           );
//           const result = await res.json();
//           setData({
//             location: coords,
//             address: result.display_name,
//             city: result.address?.city,
//           });
//         } catch {
//           setData("Failed to fetch address");
//         }
//       });
//     };
//     getLocationAndAddress();
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("https://fakestoreapi.com/products");
//         const data = await res.json();
//         setAllProducts(data);
//       } catch (error) {
//         console.error("Failed to fetch products", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (search.trim() === "") {
//       setSuggestions([]);
//       return;
//     }

//     const lowerQuery = search.toLowerCase();
//     const matched = allProducts.filter(
//       (p) =>
//         p.title.toLowerCase().includes(lowerQuery) ||
//         p.category.toLowerCase().includes(lowerQuery)
//     );
//     setSuggestions(matched.slice(0, 20));
//   }, [search, allProducts]);
//   const totalItems = cartItems.length;

//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <AppBar position="sticky" sx={{ backgroundColor: "#0f172a", boxShadow: 3 }}>
//       <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
//         <Typography
//           variant="h5"
//           fontWeight="bold"
//           color="white"
//           component={NavLink}
//           to="/"
//           sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
//         >
//           ShopNow
//           <StorefrontIcon sx={{ verticalAlign: "middle", ml: 1 }} />
//         </Typography>

//         <Box
//           sx={{
//             p: 2,
//             backgroundColor: "rgba(255, 255, 255, 0.2)",
//             color: "white",
//             borderRadius: 2,
//             marginRight: "130px",
//           }}
//         >
//           <Typography variant="body2">
//             {" "}
//             <PlaceIcon sx={{ verticalAlign: "middle", mr: 1 }} /> City:{" "}
//             {data.city}{" "}
//           </Typography>
//         </Box>

//         <Stack direction="row" spacing={2} alignItems="center">
//           <Button
//             component={NavLink}
//             to="/"
//             color="inherit"
//             sx={{ "&.active": { color: "yellow" } }}
//           >
//             Home
//           </Button>
//           <Button
//             component={NavLink}
//             to="/products"
//             color="inherit"
//             sx={{ "&.active": { color: "yellow" } }}
//           >
//             Products
//           </Button>
//           <Button
//             component={NavLink}
//             to="/deals"
//             color="inherit"
//             sx={{ "&.active": { color: "yellow" } }}
//           >
//             Deals
//           </Button>
//           <Button
//             component={NavLink}
//             to="/contact"
//             color="inherit"
//             sx={{ "&.active": { color: "yellow" } }}
//           >
//             Contact
//           </Button>

//           <Box sx={{ position: "relative" }}>
//             <InputBase
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               inputProps={{ "aria-label": "search" }}
//               sx={{
//                 color: "white",
//                 backgroundColor: "rgba(255, 255, 255, 0.2)",
//                 borderRadius: "4px",
//                 padding: "1px 8px",
//                 width: "650px",
//               }}
//               endAdornment={
//                 <IconButton sx={{ color: "white" }}>
//                   <SearchIcon />
//                 </IconButton>
//               }
//             />

//             {suggestions?.length > 0 && (
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: "40px",
//                   left: 0,
//                   backgroundColor: "white",
//                   color: "black",
//                   zIndex: 999,
//                   width: "100%",
//                   borderRadius: 1,
//                   boxShadow: 3,
//                   maxHeight: "200px",
//                   overflowY: "auto",
//                 }}
//               >
//                 {suggestions.map((product) => (
//                   <Box
//                     key={product.id}
//                     onClick={() => {
//                       navigate(`/product/${product.id}`);
//                       // navigate(`/products?search=${product.id}`);
//                       // navigate("/products");

//                       setSearch("");
//                       setSuggestions([]);
//                     }}
//                     sx={{
//                       px: 2,
//                       py: 1,
//                       cursor: "pointer",
//                       "&:hover": {
//                         backgroundColor: "#f0f0f0",
//                       },
//                     }}
//                   >
//                     <Typography variant="subtitle2">{product.title}</Typography>
//                     <Typography variant="caption" color="textSecondary">
//                       {product.category}
//                     </Typography>
//                   </Box>
//                 ))}
//               </Box>
//             )}
//           </Box>

//           {!isLoggedIn ? (
//             <Button
//               component={NavLink}
//               to="/login"
//               color="inherit"
//               sx={{ fontWeight: "bold" }}
//             >
//               Login <LoginIcon sx={{ verticalAlign: "middle", ml: 1 }} />
//             </Button>
//           ) : (
//             <Button
//               onClick={handleLogout}
//               color="inherit"
//               sx={{ fontWeight: "bold" }}
//             >
//               Logout <LogoutIcon sx={{ verticalAlign: "middle", ml: 1 }} />
//             </Button>
//           )}

//           <IconButton component={NavLink} to="/cart" color="inherit">
//             <Badge badgeContent={totalItems} color="secondary">
//               <ShoppingCart />
//             </Badge>
//           </IconButton>
//         </Stack>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Navbar;
  



















