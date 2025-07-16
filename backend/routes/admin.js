const express = require("express");
const adminController = require("../controllers/adminController");
const auth = require("../middleware/authenticated");

const router = express.Router();

router.post("/products", auth("admin") ,adminController.createProduct )
router.get("/products", auth("admin"), adminController.getAllProducts);
router.put("/products/:id", auth("admin"), adminController.updateProduct);
router.delete("/products/:id", auth("admin"), adminController.deleteProduct);

module.exports = router;
