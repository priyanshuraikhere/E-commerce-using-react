import { useEffect, useState, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { UserContext } from "../context/userContext"; 

const Allproduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    image1: "",
    image2: "",
    image3: "",
  });

  const { token } = useContext(UserContext); 


  useEffect(() => {
  if (!token) return;

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/products", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
//  console.log("AllProduct token:", token);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Unauthorized");
      }

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Fetch failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [token]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });
      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to delete product.");
      }
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  const handleUpdateClick = (product) => {
    setEditId(product._id);
    setEditFields({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      image1: product.image1,
      image2: product.image2,
      image3: product.image3,
    });
  };

  const handleFieldChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const handleUpdateSave = async (id) => {
    try {
      const updatedFields = {
        ...editFields,
        price: Number(editFields.price),
      };
      const res = await fetch(`http://localhost:5000/admin/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(updatedFields),
      });
      if (res.ok) {
        setProducts(
          products.map((p) => (p._id === id ? { ...p, ...updatedFields } : p))
        );
        setEditId(null);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to update product.");
      }
    } catch (err) {
      alert("Failed to update product.");
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, letterSpacing: 1, color: "#22223b", mb: 4 }}
      >
        All Products (Admin)
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.length === 0 ? (
          <Typography>No products found.</Typography>
        ) : (
          products.map((product) => {
            function ProductCard() {
              const [showFull, setShowFull] = useState(false);
              const desc =
                editId === product._id
                  ? editFields.description
                  : product.description;
              const isLong = desc.length > 90;
              const displayDesc = showFull
                ? desc
                : isLong
                ? desc.slice(0, 80) + "..."
                : desc;

              return (
                <Card
                  sx={{
                    width: 450,
                    maxWidth: 450,
                    mx: "auto",
                    my: 2,
                    bgcolor: "#fff",
                    borderRadius: 3,
                    boxShadow: "0 4px 24px 0 rgba(34,34,59,0.08)",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 8px 32px 0 rgba(34,34,59,0.16)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      editId === product._id ? editFields.image : product.image
                    }
                    alt={product.title}
                    sx={{
                      height: 150,
                      width: 150,
                      objectFit: "contain",
                      mx: "auto",
                      my: 2,
                      bgcolor: "#f8f9fa",
                      borderRadius: 2,
                    }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <strong>ID:</strong> {product._id}
                    </Typography>
                    <Stack direction="row">
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "#4a4e69", minWidth: 90 }}
                      >
                        Name:
                      </Typography>
                      {editId === product._id ? (
                        <TextField
                          name="title"
                          value={editFields.title}
                          onChange={handleFieldChange}
                          size="small"
                          fullWidth
                          variant="outlined"
                        />
                      ) : (
                        <Typography sx={{ fontWeight: 500 }}>
                          {product.title}
                        </Typography>
                      )}
                    </Stack>

                    <Stack direction="row" spacing={1} mt={1}>
                      <Typography variant="subtitle2">Price:</Typography>
                      {editId === product._id ? (
                        <TextField
                          name="price"
                          value={editFields.price}
                          onChange={handleFieldChange}
                          size="small"
                          fullWidth
                          variant="outlined"
                        />
                      ) : (
                        <Typography sx={{ color: "#2a9d8f" }}>
                          ₹{product.price}
                        </Typography>
                      )}
                    </Stack>

                    <Stack direction="row" spacing={1} mt={1}>
                      <Typography variant="subtitle2">Description:</Typography>
                      {editId === product._id ? (
                        <TextField
                          name="description"
                          value={editFields.description}
                          onChange={handleFieldChange}
                          size="small"
                          fullWidth
                          multiline
                          minRows={2}
                          variant="outlined"
                        />
                      ) : (
                        <>
                          <Typography sx={{ fontSize: 14 }}>
                            {displayDesc}
                          </Typography>
                          {isLong && (
                            <Button
                              size="small"
                              sx={{ ml: 1, fontSize: 13, p: 0 }}
                              onClick={() => setShowFull((f) => !f)}
                            >
                              {showFull ? "See less" : "See more"}
                            </Button>
                          )}
                        </>
                      )}
                    </Stack>

                    <Stack direction="row" spacing={1} mt={1}>
                      <Typography variant="subtitle2">Category:</Typography>
                      {editId === product._id ? (
                        <TextField
                          name="category"
                          value={editFields.category}
                          onChange={handleFieldChange}
                          size="small"
                          fullWidth
                          variant="outlined"
                        />
                      ) : (
                        <Typography>{product.category}</Typography>
                      )}
                    </Stack>

                    {/* Actions */}
                    <Stack
                      direction="row"
                      spacing={1.5}
                      mt={3}
                      justifyContent="flex-end"
                    >
                      {editId === product._id ? (
                        <>
                          <Tooltip title="Save">
                            <IconButton
                              color="primary"
                              onClick={() => handleUpdateSave(product._id)}
                            >
                              <SaveIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Cancel">
                            <IconButton
                              color="secondary"
                              onClick={handleCancelEdit}
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => handleUpdateClick(product)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(product._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </CardContent>
                </Card>
              );
            }

            return (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard />
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default Allproduct;


// e-commerce website project hai or admin role hai or wo product ko update or delete kar sakta hai agar jese product ko delete karde toh user side product page product dikhe out of stock mera project react or node js par hai in hinglish