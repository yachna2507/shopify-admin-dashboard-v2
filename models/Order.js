const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    orderId: String,
    customer: String,
    email: String,
    totalPrice: String,
    financialStatus: String,
});
module.exports = mongoose.model("Order", orderSchema);