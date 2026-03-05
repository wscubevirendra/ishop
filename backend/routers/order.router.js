const orderRouter = require("express").Router();
const { place, orderSuccess } = require("../controllers/order.controller");

orderRouter.post("/place", place);
orderRouter.post("/success", orderSuccess);
module.exports = orderRouter;