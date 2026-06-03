const mongoose = require("mongoose");
const productSchema = new 
mongoose.Schema({
    shopifyId: {
        type: String,
        required: true
    },

    title: String,
    price: Number,
    quantity: Number,
    image: String,
    status: {
        type: String,
    
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

    
});

module.exports = mongoose.model("Product", productSchema);