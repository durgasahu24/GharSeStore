const Razorpay = require('razorpay');
require('dotenv').config();



const keyId = process.env.KEY_ID
const keySecret = process.env.KEY_SECRET

console.log("keyId : ", process.env.KEY_ID);


const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
});

console.log('KEY_ID:', process.env.KEY_ID);
console.log('KEY_SECRET:', process.env.KEY_SECRET);


module.exports = razorpay;