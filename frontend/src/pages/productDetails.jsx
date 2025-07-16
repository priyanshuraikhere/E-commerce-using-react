import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  CircularProgress,
  CardActions,
  Collapse,
  Paper,
  Avatar,
  TextField,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { useCart } from "../context/CartContext";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ReviewsIcon from "@mui/icons-material/Reviews";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const {token} = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [showReviews, setShowReviews] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", text: "" });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.image);
        setReviewList(data.reviews || []);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!newReview.name.trim() || !newReview.text.trim()) return;

    const review = {
      user: newReview.name,
      text: newReview.text,
      image: "https://randomuser.me/api/portraits/lego/1.jpg",
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${id}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(review),
        }
      );

      const data = await res.json();
      setReviewList(data.reviews);
      setNewReview({ name: "", text: "" });
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <CircularProgress size="5rem" sx={{ color: "#15213d" }} />
      </Container>
    );
  }

  return (
    <>
      <Button
        sx={{ mt: 2, ml: 4, width: "100px" , color:"white" , backgroundColor:"#131e36" }}
        onClick={() => navigate("/products")}
      >
        <KeyboardBackspaceIcon sx={{ mr: 1  }} />
        Back
      </Button>

      <Box sx={{ position: "absolute", left: "150px", top: "180px" }}>
        {[product.image, product.image1, product.image2, product.image3].map(
          (img, index) =>
            img && (
              <CardMedia
                key={index}
                component="img"
                image={img}
                onClick={() => setSelectedImage(img)}
                sx={{
                  objectFit: "contain",
                  maxHeight: 100,
                  width: "100px",
                  mb: 2,
                  cursor: "pointer",
                  border:
                    selectedImage === img
                      ? "2px solid #15213d"
                      : "1px solid gray",
                }}
              />
            )
        )}
      </Box>

      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <Card sx={{ boxShadow: 4 }}>
          <CardMedia
            component="img"
            image={selectedImage}
            alt={product.title}
            sx={{ objectFit: "contain", maxHeight: 300 }}
          />

          <CardContent>
            <Typography variant="h5" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Category: {product.category}
            </Typography>

            {product.rating && (
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Rating
                  name="read-only-rating"
                  value={product.rating.rate}
                  readOnly
                />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({product.rating.count} reviews)
                </Typography>
              </Box>
            )}

            <Typography variant="h6" sx={{ mt: 2, color: "#1a2949" }}>
              ₹{product.price}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {product.description}
            </Typography>

            <CardActions>
              {!addedToCart ? (
              
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => {
                    if (!token) {
                      toast.warning("Please login to add products to cart");
                      navigate("/login");
                      return;
                    }
                    addToCart(product);
                    setAddedToCart(true);
                    toast.success("Added to cart");
                  }}
                  sx={{ backgroundColor: "#131e36" }}
                >
                  Add to Cart
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  onClick={() => navigate("/cart")}
                  sx={{ mt: 4 }}
                >
                  Go to Cart
                </Button>
              )}
            </CardActions>

            <Button
              variant="text"
              startIcon={<ReviewsIcon />}
              onClick={() => setShowReviews(!showReviews)}
              sx={{ mt: 2, color: "#131e36" }}
            >
              {showReviews ? "Hide Reviews" : "See Reviews"}
            </Button>

            <Collapse in={showReviews} timeout="auto" unmountOnExit>
              <Box sx={{ mt: 3 }}>
                {reviewList.map((review, index) => (
                  <Paper
                    key={index}
                    elevation={2}
                    sx={{
                      p: 2,
                      mb: 2,
                      backgroundColor: "#f9f9f9",
                      borderLeft: "4px solid #15213d",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Avatar sx={{ bgcolor: "#15213d", mr: 2 }}>
                        <img
                          src={review.image}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </Avatar>
                      <Typography variant="subtitle1">{review.user}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {review.text}
                    </Typography>
                  </Paper>
                ))}

                <Paper
                  elevation={1}
                  sx={{ p: 3, mt: 3, backgroundColor: "#f1f5f9" }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Add Your Review
                  </Typography>
                  <TextField
                    fullWidth
                    label="Your Name"
                    variant="outlined"
                    value={newReview.name}
                    onChange={(e) =>
                      setNewReview({ ...newReview, name: e.target.value })
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Your Review"
                    multiline
                    rows={3}
                    variant="outlined"
                    value={newReview.text}
                    onChange={(e) =>
                      setNewReview({ ...newReview, text: e.target.value })
                    }
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleReviewSubmit}
                    sx={{ backgroundColor: "#15213d" }}
                  >
                    Submit
                  </Button>
                </Paper>
              </Box>
            </Collapse>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default ProductDetails;
