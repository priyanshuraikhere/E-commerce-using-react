const Products = require('../models/product');


exports.createProduct = async (req, res) => {
     console.log("user:", req.user);
    try {
        const newProduct = new Products(req.body);
        await newProduct.save();
        res.status(201).json({ message: "Product created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error saving product", error: err });
    }
};


    
   exports.getAllProducts = async  (req, res) => {
        try {
            const products = await Products.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    },


    exports.updateProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const updatedProduct = await Products.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(updatedProduct);
        }
        catch (error) {
            res.status(400).json({ message: 'Error updating product', error });
        }
    },


    exports.deleteProduct = async (req, res) => {
        try {
            const { id } = req.params;
            await Products.findByIdAndDelete(id);
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    }

