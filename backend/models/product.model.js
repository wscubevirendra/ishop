const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 150,
            unique: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String
        },
        thumbnail: {
            type: String, // store filename or full URL
            required: true,
            // NOTE: Validate size during upload, not in schema
        },

        original_price: {
            type: Number,
            required: true
        },

        discount_percentage: {
            type: Number,
            default: 0
        },

        final_price: {
            type: Number,
            required: true
        },

        status: {
            type: Boolean,
            default: true
        },

        stock: {
            type: Boolean,
            default: true
        },

        is_best_seller: {
            type: Boolean,
            default: false
        },

        show_home: {
            type: Boolean,
            default: false
        },

        is_featured: {
            type: Boolean,
            default: false
        },

        is_hot: {
            type: Boolean,
            default: false
        },
        // ['qw4qweq','q2q231231','123123123','3241243124']
        other_images: [
            {
                type: String // multiple filenames/URLs
            }
        ],
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        // []
        color_ids: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "color"
            }
        ],
        brand_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", ProductSchema);