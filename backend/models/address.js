const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    fullName: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/   // basic validation for Indian numbers
    },

    addressLine1: {
        type: String,
        required: true
    },

    addressLine2: {
        type: String
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    pincode: {
        type: String,
        required: true,
        match: /^[0-9]{6}$/   // Indian pincode validation
    },

    country: {
        type: String,
        default: "India"
    },

    isDefault: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model("Address", addressSchema);