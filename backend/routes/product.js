const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
// const auth = require("../middleware/authenticated")

// router.post("/products",   productController.createProduct);


router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products/:id/reviews", productController.addReview);


module.exports = router;


