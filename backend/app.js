require('dotenv').config()
const express = require("express");
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"))
server.use(cookieParser());
server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use("/category", require("./routers/category.router"))
server.use("/color", require("./routers/color.router.js"))
server.use("/brand", require("./routers/brand.router.js"))
server.use("/product", require("./routers/product.router.js"))
server.use("/user", require("./routers/user.router.js"))
server.use("/cart", require("./routers/cart.router.js"))
server.use("/order", require("./routers/order.router.js"))

mongoose.connect(process.env.DATABASE_URL).then(
    () => {
        server.listen(
            process.env.PORT,
            () => {
                console.log("Server is running port number 5000")
            }
        );
        console.log("DataBase is connected")


    }
).catch(
    (error) => {
        console.log("DataBase not connected")
    }
)
