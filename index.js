const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config()
const userRouter = require("./routes/user")
const authRouter = require("./routes/auth")
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart")
const orderRouter = require("./routes/order")
// const stripeRouter = require("./routes/stripe")





mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
) 
    .then(()=>console.log("DB Connection Successfull"))
    .catch((err) => {
    console.log(err);
    process.exit();
});

app.use(express.json())
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
// app.use("/api/stripe", stripeRouter);




app.listen(5000, () => {
    console.log("Backend server is running");
});