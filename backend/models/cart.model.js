const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        qty: {
            type: Number,
            default: 1,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("cart", CartSchema);