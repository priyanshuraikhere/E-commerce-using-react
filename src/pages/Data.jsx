
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