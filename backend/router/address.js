const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Cart = require("../models/cart");
const Address = require("../models/address");
const { auth, adminAuth } = require("../middelware/auth");





//  CREATE ADDRESS
router.post("/address", auth, async (req, res) => {
  try {
    const newAddress = new Address({
      ...req.body,
      user: req.user._id   // attach logged-in user
    });

    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//  GET ALL ADDRESSES OF USER
router.get("/address/:userId", auth, async (req, res) => {
  try {
    //  ensure user can only access their own addresses
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const addresses = await Address.find({ user: req.params.userId });

    res.json(addresses);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



//  DELETE ADDRESS
router.delete("/address/:id", auth, async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    //  only owner can delete
    if (address.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Address.findByIdAndDelete(req.params.id);

    res.json({ message: "Address deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
