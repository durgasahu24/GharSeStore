const mongoose = require("mongoose")


const mongodbUrl = process.env.MONGODB_URI;
console.log("mongodburl",mongodbUrl)
console.log("key id and secret : ",process.env.KEY_ID);
console.log("key secret : ",process.env.KEY_SECRET);


const connectdb = () => {
    console.log("mongodb is connected :");
    return mongoose.connect(mongodbUrl)
}


module.exports = connectdb;