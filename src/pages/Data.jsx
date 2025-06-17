//wishlist page //


// import React from 'react';
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Button,
//   IconButton,
//   Box,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { useWishlist } from '../context/WishlistContext';
// import { useCart } from '../context/CartContext';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Wishlist = () => {
//   const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
//   const { addToCart } = useCart();

//   const handleAddToCart = (product) => {
//     addToCart(product);
//     toast.success('Added to cart');
//   };

//   const handleRemoveFromWishlist = (productId) => {
//     removeFromWishlist(productId);
//     toast.info('Removed from wishlist');
//   };

//   if (wishlistItems.length === 0) {
//     return (
//       <Container sx={{ mt: 4, textAlign: 'center' }}>
//         <FavoriteIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
//         <Typography variant="h4" gutterBottom>
//           Your Wishlist is Empty
//         </Typography>
//         <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//           Add some products to your wishlist to see them here
//         </Typography>
//         <Button
//           component={Link}
//           to="/products"
//           variant="contained"
//           sx={{ backgroundColor: '#131e36' }}
//         >
//           Continue Shopping
//         </Button>
//       </Container>
//     );
//   }

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//         <Typography variant="h4" fontWeight="bold">
//           My Wishlist ({wishlistItems.length} items)
//         </Typography>
//         <Button
//           onClick={clearWishlist}
//           variant="outlined"
//           color="error"
//           startIcon={<DeleteIcon />}
//         >
//           Clear All
//         </Button>
//       </Box>

//       <Grid container spacing={3}>
//         {wishlistItems.map((product) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//             <Card
//               sx={{
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 position: 'relative',
//                 transition: 'transform 0.2s',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                 },
//               }}
//             >
//               <IconButton
//                 onClick={() => handleRemoveFromWishlist(product.id)}
//                 sx={{
//                   position: 'absolute',
//                   top: 8,
//                   right: 8,
//                   zIndex: 1,
//                   backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                   '&:hover': {
//                     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                   },
//                 }}
//               >
//                 <FavoriteIcon sx={{ color: '#e91e63' }} />
//               </IconButton>

//               <Link
//                 to={`/product/${product.id}`}
//                 style={{ textDecoration: 'none' }}
//               >
//                 <CardMedia
//                   component="img"
//                   image={product.image}
//                   alt={product.title}
//                   sx={{
//                     height: 200,
//                     objectFit: 'contain',
//                     p: 2,
//                   }}
//                 />
//               </Link>

//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography variant="h6" component="div" gutterBottom>
//                   {product.title.length > 50
//                     ? `${product.title.substring(0, 50)}...`
//                     : product.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" gutterBottom>
//                   {product.category}
//                 </Typography>
//                 <Typography variant="h6" color="primary" fontWeight="bold">
//                   ₹{product.price.toFixed(2)}
//                 </Typography>
//               </CardContent>

//               <CardActions sx={{ p: 2 }}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   startIcon={<ShoppingCartIcon />}
//                   onClick={() => handleAddToCart(product)}
//                   sx={{ backgroundColor: '#131e36' }}
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

// export default Wishlist;









//wishlistcontextpage

// import React, { createContext, useContext, useState, useEffect } from 'react';

// const WishlistContext = createContext();

// export function WishlistProvider({ children }) {
//   const [wishlistItems, setWishlistItems] = useState(() => {
//     const savedWishlist = localStorage.getItem('wishlistItems');
//     return savedWishlist ? JSON.parse(savedWishlist) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
//   }, [wishlistItems]);

//   const addToWishlist = (product) => {
//     setWishlistItems(prevItems => {
//       const existing = prevItems.find(item => item.id === product.id);
//       if (existing) {
//         return prevItems; 
//       } else {
//         return [...prevItems, product];
//       }
//     });
//   };

//   const removeFromWishlist = (id) => {
//     setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
//   };

//   const clearWishlist = () => {
//     setWishlistItems([]);
//     localStorage.removeItem("wishlistItems");
//   };

//   const isInWishlist = (productId) => {
//     return wishlistItems.some(item => item.id === productId);
//   };

//   const getWishlistCount = () => {
//     return wishlistItems.length;
//   };

//   return (
//     <WishlistContext.Provider value={{ 
//       wishlistItems, 
//       addToWishlist, 
//       removeFromWishlist, 
//       clearWishlist, 
//       isInWishlist, 
//       getWishlistCount 
//     }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// }

// export const useWishlist = () => useContext(WishlistContext);










//purana wala


// import React, { createContext, useContext, useReducer, useEffect } from 'react';

// const WishlistContext = createContext();

// const wishlistReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TO_WISHLIST':
//       return [...state, action.payload];
    
//     case 'REMOVE_FROM_WISHLIST':
//       return state.filter(item => item.id !== action.payload);
    
//     case 'CLEAR_WISHLIST':
//       return [];
    
//     case 'LOAD_WISHLIST':
//       return action.payload;
    
//     default:
//       return state;
//   }
// };

// export const WishlistProvider = ({ children }) => {
//   const [wishlistItems, dispatch] = useReducer(wishlistReducer, []);


//   useEffect(() => {
//     const savedWishlist = localStorage.getItem('wishlist');
//     if (savedWishlist) {
//       dispatch({
//         type: 'LOAD_WISHLIST',
//         payload: JSON.parse(savedWishlist)
//       });
//     }
//   }, []);

  
//   useEffect(() => {
//     localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
//   }, [wishlistItems]);

//   const addToWishlist = (product) => {

//     const existingItem = wishlistItems.find(item => item.id === product.id);
    
//     if (!existingItem) {
//       dispatch({
//         type: 'ADD_TO_WISHLIST',
//         payload: product
//       });
//     }
//   };

//   const removeFromWishlist = (productId) => {
//     dispatch({
//       type: 'REMOVE_FROM_WISHLIST',
//       payload: productId
//     });
//   };

//   const clearWishlist = () => {
//     dispatch({ type: 'CLEAR_WISHLIST' });
//   };

//   const isInWishlist = (productId) => {
//     return wishlistItems.some(item => item.id === productId);
//   };

//   const value = {
//     wishlistItems,
//     addToWishlist,
//     removeFromWishlist,
//     clearWishlist,
//     isInWishlist,
//     wishlistCount: wishlistItems.length
//   };

//   return (
//     <WishlistContext.Provider value={value}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => {
//   const context = useContext(WishlistContext);
//   if (!context) {
//     throw new Error('useWishlist must be used within a WishlistProvider');
//   }
//   return context;
// };




//app.jsx me likhna hai
//import { WishlistProvider } from './context/WishlistContext';

{/* <WishlistProvider>
  </WishlistProvider>  */}





 // product page 


//  import React, { useEffect, useState } from "react";
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
//   IconButton,
//   Box,
//   FormControl,
//   RadioGroup,
//   Radio,
//   FormControlLabel,
// } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext"; 
// import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Products = () => {
//   const { category } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [showRadio, setShowRadio] = useState(true);
//   const [selectedSorting, setSelectedSorting] = useState("default");
//   const [searchTerm, setSearchTerm] = useState("");

//   const { cartItems, addToCart, removeFromCart } = useCart();
//   const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const search = queryParams.get("search") || "";
//     setSearchTerm(search);
//   }, [location.search]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("https://fakestoreapi.com/products");
//         const data = await res.json();
//         setProducts(data);
//         const uniqueCategories = [
//           "all",
//           ...new Set(data.map((item) => item.category)),
//         ];
//         setCategories(uniqueCategories);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (category && categories.includes(category)) {
//       setSelectedCategory(category);
//     } else if (!category) {
//       setSelectedCategory("all");
//     }
//   }, [category, categories]);

//   const getQuantity = (productId) => {
//     const item = cartItems.find((item) => item.id === productId);
//     return item ? item.quantity : 0;
//   };

//   const isInWishlist = (productId) => {
//     return wishlistItems.some((item) => item.id === productId);
//   };

//   const handleWishlistToggle = (product) => {
//     if (isInWishlist(product.id)) {
//       removeFromWishlist(product.id);
//       toast.info("Removed from wishlist");
//     } else {
//       addToWishlist(product);
//       toast.success("Added to wishlist");
//     }
//   };

//   const filteredProducts = products.filter((product) => {
//     const categoryMatch =
//       selectedCategory === "all" || product.category === selectedCategory;

//     const searchMatch =
//       searchTerm.trim() === "" ||
//       product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.category.toLowerCase().includes(searchTerm.toLowerCase());

//     return categoryMatch && searchMatch;
//   });

//   const sortedProducts = filteredProducts.sort((a, b) => {
//     if (selectedSorting === "lowToHigh") return a.price - b.price;
//     if (selectedSorting === "highToLow") return b.price - a.price;
//     return 0;
//   });

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
//         <CircularProgress size="5rem" sx={{ color: "#15213d" }} />
//       </Container>
//     );
//   }

//   return (
//     <>
//       <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "left",
//             flexDirection: "column",
//             marginTop: "100px",
//           }}
//         >
//           <Box sx={{ width: "300px", ml: 3, display: "flex", height: "300px" }}>
//             <FormControl>
//               <Button
//                 variant="outlined"
//                 onClick={() => setShowRadio((prev) => !prev)}
//                 sx={{
//                   textTransform: "none",
//                   width: "300px",
//                   backgroundColor: "#131e36",
//                   color: "white",
//                 }}
//               >
//                 Filter by Category
//               </Button>

//               <Button
//                 variant="text"
//                 onClick={() => {
//                   setSelectedCategory("all");
//                   navigate("/products");
//                 }}
//                 sx={{
//                   marginLeft: "200px",
//                   marginTop: "5px",
//                   textTransform: "none",
//                   textDecoration: "underline",
//                   color: "#051d51",
//                 }}
//               >
//                 Clear Filter
//               </Button>

//               {showRadio && (
//                 <RadioGroup
//                   value={selectedCategory}
//                   onChange={(e) => {
//                     const selected = e.target.value;
//                     setSelectedCategory(selected);

//                     const searchQuery = searchTerm
//                       ? `?search=${encodeURIComponent(searchTerm)}`
//                       : "";
//                     navigate(
//                       selected === "all"
//                         ? `/products${searchQuery}`
//                         : `/products/${encodeURIComponent(
//                             selected
//                           )}${searchQuery}`
//                     );
//                   }}
//                   sx={{ marginLeft: "20px", width: "220px" }}
//                 >
//                   {categories.map((cat) => (
//                     <FormControlLabel
//                       key={cat}
//                       value={cat}
//                       control={<Radio size="small" style={{ color: "#172c56" }} />}
//                       label={
//                         cat === "all"
//                           ? "All"
//                           : cat.charAt(0).toUpperCase() + cat.slice(1)
//                       }
//                     />
//                   ))}
//                 </RadioGroup>
//               )}
//             </FormControl>
//           </Box>

//           <RadioGroup
//             value={selectedSorting}
//             onChange={(e) => setSelectedSorting(e.target.value)}
//             sx={{
//               justifyContent: "left",
//               display: "flex",
//               ml: 6,
//               mt: 2,
              
//             }}
//           >
//             <Button
//               variant="outline"
//               sx={{
//                 mb: 1,
//                 marginLeft: "-24px",
//                 width: "300px",
//                 backgroundColor: "#131e36",
//                 color: "white",
//                 textTransform: "capitalize"
//               }}
//             >
//               Sorting
//             </Button>
//             <FormControlLabel
//               value="default"
//               control={<Radio size="small" style={{ color: "#172c56" }} />}
//               label="Default"
//             />
//             <FormControlLabel
//               value="highToLow"
//               control={<Radio size="small" style={{ color: "#172c56" }} />}
//               label="Price: High to Low"
//             />
//             <FormControlLabel
//               value="lowToHigh"
//               control={<Radio size="small" style={{ color: "#172c56" }} />}
//               label="Price: Low to High"
//             />
//           </RadioGroup>
//         </Box>
//         <Container sx={{ mt: 8, mr: 8 }}>
//           <Typography
//             variant="h4"
//             textAlign="center"
//             fontWeight="bold"
//             sx={{ mb: 4 }}
//           >
//             Explore Our Products
//           </Typography>

//           <Grid
//             container
//             spacing={4}
//             sx={{ ml: 10, alignItems: "center", mb: 4 }}
//           >
//             {sortedProducts.map((product) => {
//               const quantity = getQuantity(product.id);
//               const inWishlist = isInWishlist(product.id);
//               return (
//                 <Grid sx={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
//                   <Card
//                     sx={{
//                       minHeight: "380px",
//                       maxHeight: "380px",
//                       minWidth: "300px",
//                       maxWidth: "300px",
//                       display: "flex",
//                       flexDirection: "column",
//                       boxShadow: 4,
//                       transition: "transform 0.3s ease-in-out",
//                       position: "relative",
//                       "&:hover": {
//                         transform: "scale(1.05)",
//                       },
//                     }}
//                   >
//                     {/* Wishlist Heart Icon */}
//                     <IconButton
//                       onClick={() => handleWishlistToggle(product)}
//                       sx={{
//                         position: "absolute",
//                         top: 8,
//                         right: 8,
//                         zIndex: 1,
//                         backgroundColor: "rgba(255, 255, 255, 0.8)",
//                         "&:hover": {
//                           backgroundColor: "rgba(255, 255, 255, 0.9)",
//                         },
//                       }}
//                     >
//                       {inWishlist ? (
//                         <FavoriteIcon sx={{ color: "#e91e63" }} />
//                       ) : (
//                         <FavoriteBorderIcon sx={{ color: "#757575" }} />
//                       )}
//                     </IconButton>

//                     <Link
//                       to={`/product/${product.id}`}
//                       style={{ textDecoration: "none" }}
//                     >
//                       <CardMedia
//                         component="img"
//                         image={product.image}
//                         alt={product.title}
//                         sx={{
//                           maxHeight: 130,
//                           minHeight: 130,
//                           width: "60%",
//                           objectFit: "contain",
//                           p: 2,
//                           margin: "0 auto",
//                           transition: "transform 0.3s ease-in-out",
//                           "&:hover": {
//                             transform: "scale(1.3)",
//                           },
//                         }}
//                       />
//                     </Link>
//                     <CardContent sx={{ flexGrow: 1 }}>
//                       <Typography variant="subtitle2">
//                         {product.title}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{ mb: 1 }}
//                       >
//                         {product.category}
//                       </Typography>
//                       <Typography variant="body1" fontWeight="bold">
//                         ₹ {product.price.toFixed(2)}
//                       </Typography>
//                     </CardContent>
//                     <CardActions>
//                       {quantity === 0 ? (
//                         <Button
//                           size="small"
//                           variant="contained"
//                           startIcon={<ShoppingCartIcon />}
//                         onClick={() => {
//                           addToCart(product);
//                           toast.success("Add to cart");
//                         }}
//                         sx={{ backgroundColor: "#131e36" }}
//                         >
//                           Add to Cart
//                         </Button>
//                       ) : (
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             ml: "130px",
//                           }}
//                         >
//                           <IconButton
//                             onClick={() => removeFromCart(product.id)}
//                           >
//                             <RemoveIcon
//                               sx={{
//                                 backgroundColor: "#131e36",
//                                 color: "white",
//                                 borderRadius: "50%",
//                                 padding: "4px",
//                               }}
//                             />
//                           </IconButton>
//                           <Typography variant="body1" sx={{ mx: 1 }}>
//                             {quantity}
//                           </Typography>
//                           <IconButton onClick={() => addToCart(product)}>
//                             <AddIcon
//                               sx={{
//                                 backgroundColor: "#131e36",
//                                 color: "white",
//                                 borderRadius: "50%",
//                                 padding: "4px",
//                               }}
//                             />
//                           </IconButton>
//                         </Box>
//                       )}
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               );
//             })}
//           </Grid>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default Products;




//dekho phele toh mera project ecommerce website  hai jo ki react + mui css use kiya hai  hai jisme me product fatch kar rha hu fake api se orr login signup ko use kar rha hu localstorage se orr cart me product bhej rha hu usecontext ki help se orr product ki payment kar rha hu strip se nodejs ki help se mene bss backend payment karne ke liye use kiya.
//lakin ab mujhe ye sab pura backend par chahiye jese nodejs , express , mongodb kya ye ho jayga kya  tum se?