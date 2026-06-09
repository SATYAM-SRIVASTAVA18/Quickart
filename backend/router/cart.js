const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middelware/auth');
const Cart = require("../models/cart");


//  Add To Cart
router.post("/add", auth, async (req, res) => {
    try {
        // use authenticated user as cart owner
        const userId = req.user && req.user._id ? req.user._id : null;
        if (!userId) return res.status(401).json({ message: "Login required" });

        const { productId } = req.body;
        if (!productId) return res.status(400).json({ message: "productId is required" });

        // Find cart of user
        let cart = await Cart.findOne({ user: userId });

        // If cart doesn't exist create one
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: []
            });
        }

        // Check product already exists?
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId.toString()
        );

        if (itemIndex > -1) {
            // increase quantity
            cart.items[itemIndex].quantity += 1;
        } else {
            // add new product
            cart.items.push({
                product: productId,
                quantity: 1
            });
        }

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//  Get Cart (by userId)
router.get("/cart/:userId", async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate("items.product");
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//  Remove Item from Cart
router.delete("/cart/remove/:userId/:itemId", async (req, res) => {
    try {
        const { userId, itemId } = req.params;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            (item) => item._id.toString() !== itemId
        );

        await cart.save();

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;