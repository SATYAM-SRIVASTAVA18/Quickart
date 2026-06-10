const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const Payment = require("../models/PaymentModel");
const crypto = require("crypto");
const dotenv = require("dotenv");
const { auth } = require("../middelware/auth");
dotenv.config();

const Address = require("../models/address");
const Order = require("../models/order");
const Product = require("../models/product");
const Cart = require("../models/cart");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
router.post("/checkout", async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: Number(amount) * 100, // ₹  paise
            currency: "INR",
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({ success: true, order });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating Razorpay order" });
    }
});

// Verify Payment + Order Create with address snapshot
router.post("/verify", auth, async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            addressId,
            productId,
            quantity
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: "Invalid address" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const finalQuantity = Number(quantity) || 1;
        const finalAmount = product.price * finalQuantity;

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

        await Order.create({
            user: req.user._id,
            address: addressSnapshot,
            paymentId: razorpay_payment_id,
            status: "Pending",

            items: [
                {
                    product: product._id,
                    name: product.name,
                    price: product.price,   // snapshot
                    quantity: finalQuantity
                }
            ],

            totalAmount: finalAmount
        });

        // remove the product from cart after order is placed
        await Cart.updateOne(
            { user: req.user._id },
            {
                $pull: {
                    items: { product: product._id }
                }
            }
        );

        res.status(200).json({
            success: true,
            message: "Payment verified & Order placed successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error verifying payment" });
    }
});



module.exports = router;
