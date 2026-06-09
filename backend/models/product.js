const { Schema } = require('mongoose');
const review = require('./review');
const mongoose = require('mongoose').default;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  img:{
  filename: {
        type: String,
    },
  url: {
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7RSzBp2oZChfPDxmRovtHzTIpTQcBIvwRmQ&s",
      set: (v) => v === "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7RSzBp2oZChfPDxmRovtHzTIpTQcBIvwRmQ&s" : v,
    },
  },

  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);