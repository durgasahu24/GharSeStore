const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    
    role: {
        type: String,
        enum: ["CUSTOMER", "ADMIN"], // Define possible roles
        default: "CUSTOMER",        // Default to a regular user
        required:true
    },
    mobile: {
        type: String,
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses"
    }],
    paymentInformation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "payment_information"
        }
    ],
    ratings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ratings"
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "reviews"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

const User = mongoose.model("users", userSchema);

module.exports = User