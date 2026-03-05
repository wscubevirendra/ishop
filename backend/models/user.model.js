const mongoose = require("mongoose");

const ShippingAddressSchema = new mongoose.Schema(
    {
        addressLine1: { type: String, required: true }, // Required field
        addressLine2: { type: String, required: true }, // Optional field
        city: { type: String, required: true },
        contact: { type: String, default: null },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    { _id: false } // Disable _id for this schema
);


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            minLength: 4
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        shipping_address: {
            type: [ShippingAddressSchema],
            default: [],
        }, otp: {
            type: String,
        },
        otpExpiry: {
            type: Date,
        },
        contact: {
            type: String,
            unique: true,
            sparse: true,
            default: null,
        },
        isverified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true
    }
);



// Create Admin Model
const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
