const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
    orderId:{
        type: mongoose.Schema.ObjectId,
        ref: "Order",
        required: true,
    },
    location: [{
        entryDate:{
            type: Date,
            default: Date.now,
        },
        lat:{
            type: Number,
            required: true,
        },
        long:{
            type: Number,
            required: true,
        }
    }],
    vendor:{
        type:String,
        required:false            
    },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("track", trackSchema);
