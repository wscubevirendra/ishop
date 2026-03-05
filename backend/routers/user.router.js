const { register, login, verifyOtp, resetOtp, me, address, logout } = require("../controllers/user.controller.js");
const userVerfiy = require("../middleware/userVerify.js");
const userRouter = require("express").Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/otp-verify", verifyOtp);
userRouter.post("/reset-otp", resetOtp);
userRouter.get("/me", userVerfiy, me)
userRouter.post("/address/:id", address)
userRouter.get("/logout", logout)
module.exports = userRouter;