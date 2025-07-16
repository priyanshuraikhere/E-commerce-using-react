import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../context/userContext"; 
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const { token } = useContext(UserContext); 

  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    image1: "",
    image2: "",
    image3: "",
    ratingRate: "",
    ratingCount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: product.title,
      price: parseFloat(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
      image1: product.image1,
      image2: product.image2,
      image3: product.image3,
      rating: {
        rate: parseFloat(product.ratingRate),
        count: parseInt(product.ratingCount, 10),
      },
    };

    try {
      const res = await fetch("http://localhost:5000/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Product added successfully");
        setProduct({
          title: "",
          price: "",
          description: "",
          category: "",
          image: "",
          image1: "",
          image2: "",
          image3: "",
          ratingRate: "",
          ratingCount: "",
        });
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to add product");
      }
    } catch (err) {
      console.error("Add product error:", err);
      toast.error("Error while adding product");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={6} sx={{ p: 3, width: "500px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={product.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            sx={{ ml: 6 }}
            label="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
            margin="normal"
            required
            type="number"
          />
          <TextField
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            select
            sx={{ width: "225px", ml: 6 }}
            label="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
            margin="normal"
            required
          >
            <MenuItem value="">
              <em>Select Category</em>
            </MenuItem>
            <MenuItem value="Men's Clothing">Men's Clothing</MenuItem>
            <MenuItem value="Women's Clothing">Women's Clothing</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Jewelery">Jewelery</MenuItem>
          </TextField>
          <TextField
            label="Image URL"
            name="image"
            value={product.image}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            sx={{ ml: 6 }}
            label="Image1 URL"
            name="image1"
            value={product.image1}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Image2 URL"
            name="image2"
            value={product.image2}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            sx={{ ml: 6 }}
            label="Image3 URL"
            name="image3"
            value={product.image3}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Rating Rate"
            name="ratingRate"
            value={product.ratingRate}
            onChange={handleChange}
            margin="normal"
            type="number"
          />
          <TextField
            sx={{ ml: 6 }}
            label="Rating Count"
            name="ratingCount"
            value={product.ratingCount}
            onChange={handleChange}
            margin="normal"
            type="number"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
      
    </Container>
  );
};

export default AddProduct;

















// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   Paper,
//   MenuItem,
// } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     title: "",
//     price: "",
//     description: "",
//     category: "",
//     image: "",
//     image1: "",
//     image2: "",
//     image3: "",
//     ratingRate: "",
//     ratingCount: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({...prev,[name]: value}));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       title: product.title,
//       price: parseFloat(product.price),
//       description: product.description,
//       category: product.category,
//       image: product.image,
//       image1: product.image1,
//       image2: product.image2,
//       image3: product.image3,
//       rating: {
//         rate: parseFloat(product.ratingRate),
//         count: parseInt(product.ratingCount, 10),
//       },
//     };

//     const res = await fetch("http://localhost:5000/admin/products", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     if (res.ok) {
//       toast.success("Product added successfully");
//       setProduct({
//         title: "",
//         price: "",
//         description: "",
//         category: "",
//         image: "",
//         image1: "",
//         image2: "",
//         image3: "",
//         ratingRate: "",
//         ratingCount: "",
//       });
//     } else {
//       toast.error("Failed to add product");
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
//       <Paper elevation={6} sx={{ p: 3 , width:"500px" }}>
//         <Typography  variant="h5" align="center" gutterBottom>
//           Add Product
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit}>
//           <TextField
            
//             label="Title"
//             name="title"
//             value={product.title}
//             onChange={handleChange}
//             margin="normal"
//             required
//           />
//           <TextField
//             sx={{ml:6}}
//             label="Price"
//             name="price"
//             value={product.price}
//             onChange={handleChange}
//             margin="normal"
//             required
//             type="number"
//           />
//           <TextField
            
//             label="Description"
//             name="description"
//             value={product.description}
//             onChange={handleChange}
//             margin="normal"
//             required
//           />
//           <TextField
//             select
//             sx={{width:"225px", ml:6}}
//             label="Category"
//             name="category"
//             value={product.category}
//             onChange={handleChange}
//             margin="normal"
//             required
//           >
//             <MenuItem value="">
//               <em>Select Category</em>
//             </MenuItem>
//             <MenuItem value="Men's Clothing">Men's Clothing</MenuItem>
//             <MenuItem value="Women's Clothing">Women's Clothing</MenuItem>
//             <MenuItem value="Electronics">Electronics</MenuItem>
//             <MenuItem value="Jewelery">Jewelery</MenuItem>
//           </TextField>
//           <TextField
            
//             label="Image URL"
//             name="image"
//             value={product.image}
//             onChange={handleChange}
//             margin="normal"
//             required
//           />
//           <TextField
//             sx={{ml:6}}
//             label="Image1 URL"
//             name="image1"
//             value={product.image1}
//             onChange={handleChange}
//             margin="normal"
//           />
//           <TextField
            
//             label="Image2 URL"
//             name="image2"
//             value={product.image2}
//             onChange={handleChange}
//             margin="normal"
//           />
//           <TextField
//            sx={{ml:6}}
//             label="Image3 URL"
//             name="image3"
//             value={product.image3}
//             onChange={handleChange}
//             margin="normal"
//           />
//           <TextField
            
//             label="Rating Rate"
//             name="ratingRate"
//             value={product.ratingRate}
//             onChange={handleChange}
//             margin="normal"
//             type="number"
//           />
//           <TextField
//              sx={{ml:6}}
//             label="Rating Count"
//             name="ratingCount"
//             value={product.ratingCount}
//             onChange={handleChange}
//             margin="normal"
//             type="number"
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             Submit
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default AddProduct;
