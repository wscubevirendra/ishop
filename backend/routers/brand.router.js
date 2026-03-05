const brandRouter = require("express").Router();
const { create, getData, update, statusUpdate, deleteById } = require("../controllers/brand.controller");
const fileupload = require("express-fileupload");
brandRouter.post("/create", fileupload({ createParentPath: true }), create);
brandRouter.get("/", getData);
brandRouter.put("/update/:id", fileupload({ createParentPath: true }), update);
brandRouter.patch("/status/:id", statusUpdate);
brandRouter.delete("/delete/:id", deleteById)

module.exports = brandRouter;