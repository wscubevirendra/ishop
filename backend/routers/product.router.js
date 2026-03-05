const productRouter = require("express").Router();
const { create, getData, update, statusUpdate, deleteById, add_images } = require("../controllers/product.controller");
const fileupload = require("express-fileupload");
productRouter.post("/create", fileupload({ createParentPath: true }), create);
productRouter.get("/", getData);
productRouter.post("/images/:id", fileupload({ createParentPath: true }), add_images)
module.exports = productRouter;