const cartRouter = require("express").Router();
const { cartSync, addTocart } = require("../controllers/cart.controller");

cartRouter.post("/cart-sync", cartSync);
cartRouter.post("/add-to-cart", addTocart);

module.exports = cartRouter;