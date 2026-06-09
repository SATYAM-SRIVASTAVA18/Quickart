const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middelware/auth');
const Review = require('../models/review');


// Add Review to Product
router.post("/products/:id/reviews", auth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const review = new Review({
            comment: req.body.comment,
            rating: req.body.rating,
            author: req.user._id,
            product: req.params.id
        });

        await review.save();
        res.json(review);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Reviews for Product
router.get("/products/:id/review", async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.id }).populate("author", "name");
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE Review (Only Owner)
router.delete("/products/:productId/reviews/:reviewId", auth, async (req, res) => {
    try {
        const { productId, reviewId } = req.params;
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Check if logged-in user is the author
        if (review.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not allowed to delete this review" });
        }

        await Review.findByIdAndDelete(reviewId);

        res.json({ message: "Review deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;