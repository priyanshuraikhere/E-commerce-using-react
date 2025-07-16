const Product = require("../models/product");

// exports.createProduct = async (req, res) => {
//     try {
//         const newProduct = new Product(req.body);
//         await newProduct.save();
//         res.status(201).json({ message: "Product created successfully" });
//     } catch (err) {
//         res.status(500).json({ message: "Error saving product", error: err });
//     }
// };

exports.addReview = async (req, res) => {
    try {
        const { user, text, image } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        product.reviews.push({ user, text, image });
        await product.save();

        res.status(201).json({ message: "Review added successfully", reviews: product.reviews });
    } catch (err) {
        res.status(500).json({ message: "Error adding review", error: err.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Error fetching products", error: err });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Error fetching product", error: err });
    }
};
