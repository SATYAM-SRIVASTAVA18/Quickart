const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Cart = require("../models/cart");
const Address = require("../models/address");
const { auth, adminAuth } = require("../middelware/auth");

// Create Order (cart se - address snapshot save karta hai)
router.post("/create", auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const { addressId } = req.body;

        //  Address fetch 
        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: "Invalid address" });
        }

        //  Ensure address belongs to user
        if (address.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized address" });
        }

        //  Cart fetch 
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart empty" });
        }

        //  Cart → Order items (with snapshot)
        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            name: item.product.name,     // snapshot
            price: item.product.price,
            quantity: item.quantity
        }));

        // Total calculate
        const total = orderItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        // Address snapshot create
        const addressSnapshot = {
            fullName: address.fullName,
            phone: address.phone,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2 || "",
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            country: address.country || "India"
        };

        //  create order
        const order = new Order({
            user: userId,
            items: orderItems,
            address: addressSnapshot,   // snapshot of address at the time of order
            totalAmount: total
        });

        await order.save();

        //  Clear cart
        cart.items = [];
        await cart.save();

        res.status(201).json(order);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET USER ORDERS
router.get("/my", auth, async (req, res) => {
    try {
        const userId = req.user._id;

        const orders = await Order.find({ user: userId })
            .sort({ createdAt: -1 }); // latest first

        res.json(orders);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ADMIN: GET ALL ORDERS
router.get("/admin/all", auth, adminAuth, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ADMIN: UPDATE ORDER STATUS
router.put("/admin/status/:orderId", auth, adminAuth, async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.json(order);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
