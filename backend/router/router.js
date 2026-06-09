const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const{ auth , adminAuth}  = require('../middelware/auth');
const Review = require('../models/review');
const Cart = require("../models/cart");
const Address = require("../models/address");

router.get('/', (req, res) => {
  res.send('Hello World!');
});


router.get('/n', (req, res) => {
  res.send('Hello nikhil');
});


// Create Product for Admin Only
router.post('/products', async (req, res) => {
  try {
    const { name, price, description, img: { url } } = req.body;

    const product = new Product({
      name,
      price,
      description,
      img: {
        filename: "product-image",
        url,
      }
    });

    await product.save();
    res.json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Products for Home Page
router.get('/data', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Product by ID for Product Details Page
router.get('/products/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'login', navigateTo: '/login' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// edit route for admin only
router.put("/product/:id",adminAuth, async (req, res) => {
  try {
    const { name, price, description, img: { url } } = req.body;

    const updatedData = {
      name,
      price,
      description,
      img: {
        filename: "product-image",
        url,
      }
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete product by admin + remove from all carts
router.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    //  Delete product from Product collection
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    //  Remove product from all carts
    await Cart.updateMany(
      {},
      {
        $pull: { items: { product: productId } }
      }
    );

    res.json({ message: "Product deleted and removed from all carts" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Search Route
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    const products = await Product.find({
      name: { $regex: query, $options: "i" } // case-insensitive search
    });

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;


