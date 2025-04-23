const { app } = require("./index.js")
const connectDb = require("./config/db.js")
require("dotenv").config();

console.log("port", process.env.PORT);


app.listen(process.env.PORT || 8000, async () => {
    await connectDb()
    console.log(`ecommerce api listing on port ${process.env.PORT} `);
})


