const dotenv = require('dotenv');
dotenv.config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const User = require('./models/user');
const order = require('./models/order');
const Product = require('./models/product');
const cors = require('cors');
const router = require('./router/router');
const userRouter = require('./router/user');
const reviewRouter = require('./router/review');
const cartRouter = require('./router/cart');
const orderRoutes = require("./router/order");
const RazorpayRouter = require("./router/Rozapay");
const addressRouter = require("./router/address");




app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


main().catch(err => console.log(err));

// MongoDB connection
async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

// Routes
app.use('/api', userRouter);
app.use('/api', router);
app.use('/api', reviewRouter);
app.use('/api', cartRouter);
app.use("/api/order", orderRoutes);
app.use("/api/razorpay", RazorpayRouter);
app.use("/api", addressRouter);


// Route to get Razorpay key
app.get('/getkey', (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID })
});

app.post("/logout", (req, res) => {

  res.status(200).json({
    message: "Logged out successfully"
  });

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

