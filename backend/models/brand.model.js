const mongoose = require("mongoose");


const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
      
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    
    },
    image: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: false
    },
    is_home: {
        type: Boolean,
        default: false
    },
    is_top: {
        type: Boolean,
        default: false
    },
    is_best: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)


const brandModel = mongoose.model("Brand", brandSchema);
module.exports = brandModel;