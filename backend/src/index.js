const express = require("express")
const cors = require("cors")


const app = express()

const allowedOrigins = [
  "http://localhost:5173",
  "https://ghar-se-store.vercel.app"
  
];


app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

require("dotenv").config();


app.get("/", (req, res) => {
  return res.status(200).send({ message: "welcome to ecommerce api " })
})


const authRouters = require("./routers/auth.routes.js")
app.use("/auth", authRouters)

const userRouters = require("./routers/user.routes.js")
app.use("/api/users", userRouters);


const productRouter = require("./routers/product.routes.js")
app.use("/api/products", productRouter);


const adminProductRouter = require("./routers/adminProduct.routes.js")
app.use("/api/admin/products", adminProductRouter);

const cartRouter = require("./routers/cart.routes.js")
app.use("/api/cart", cartRouter);

const cartItemRouter = require("./routers/cartItems.routes.js")
app.use("/api/cart_items", cartItemRouter);

const orderRouter = require("./routers/order.routes.js")
app.use("/api/orders", orderRouter);


const reviewRouter = require("./routers/review.routes.js")
app.use("/api/reviews", reviewRouter);

const ratingRouter = require("./routers/rating.routes.js")
app.use("/api/ratings", ratingRouter);

// admin routes handler
const adminOrderRoutes = require("./routers/adminOrder.routes.js")
app.use("/api/admin/orders", adminOrderRoutes);

// delete users

const deleteUser = require("./routers/deleteUser.routes.js")
app.use("/api/", deleteUser)


const paymentRouter = require("./routers/payment.routes.js")
app.use("/api/payments", paymentRouter);

module.exports = { app }

