const { serverError_Response } = require("../utilts/response");
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");

async function userVerify(req, res, next) {
    try {
        const token = req.headers.authorization;
        console.log(token, "token")
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const user = await UserModel.findOne({ email: decoded.email }).select("-password -otp -otpExpiry -__v -createdAt -updatedAt");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        req.user = user;
        next();

    }
    catch (error) {
        console.log(error)
        return serverError_Response(res);
    }

}

module.exports = userVerify;