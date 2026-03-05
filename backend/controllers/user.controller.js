const { allFieldsResponse, already_ExistResponse, createResponse, serverError_Response, successResponse, notFound_Response, updateResponse, deleteResponse, otpVerificationResponse } = require("../utilts/response");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY);
var jwt = require('jsonwebtoken');


const UserModel = require("../models/user.model");
const sendOtpMail = require("../utilts/sendOtpMail");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return allFieldsResponse(res);
        const user = await UserModel.findOne({ email })
        if (user && user.isverified === true) return already_ExistResponse(res);
        //6 digit otp
        const otp = Math.floor(100000 + Math.random() * 900000);
        //Date.now() + 5 minutes
        const otp_expire = Date.now() + 5 * 60 * 1000;

        const newUser = await UserModel.create({
            name,
            email,
            password: cryptr.encrypt(password),
            otp,
            otpExpiry: otp_expire
        })
        await newUser.save();
        const mailResponse = await sendOtpMail(email, otp);
        if (mailResponse.includes("failed")) {
            return serverError_Response(res, mailResponse);
        }

        return createResponse(res, newUser);

    } catch (error) {
        console.log(error)
        return serverError_Response(res);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return allFieldsResponse(res);
        const user = await UserModel.findOne({ email });
        if (!user) return notFound_Response(res, "User not found");
        if (user.isverified === false) return notFound_Response(res, "Please verify your email to login");
        const decryptedPassword = cryptr.decrypt(user.password);
        if (decryptedPassword !== password) return notFound_Response(res, "Invalid credentials");
        // Generate JWT token
        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '7d' });
        //send cookies only
        res.cookie("user_token",
            token,
            {
                httpOnly: true, // Accessible only by the server
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                secure: false, // Set to true if using HTTPS
                sameSite: "lax", // CSRF protection
            })
        return successResponse(res, "Login successful", { name: user.name, email: user.email, id: user._id });

        //         jwt.verify(token, 'shhhhh', function(err, decoded) {
        //   console.log(decoded.foo) // bar
        // });
    } catch (error) {
        console.log(error)

        return serverError_Response(res);
    }
}
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return allFieldsResponse(res);
        const user = await UserModel.findOne({ email });
        if (!user) return notFound_Response(res, "User not found");
        if (user.otp != otp) {
            return otpVerificationResponse(res, "Invalid OTP", false);
        }
        if (user.otpExpiry < Date.now()) return otpVerificationResponse(res, "OTP Expired", false);
        user.isverified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        return otpVerificationResponse(res, "OTP Verified Successfully", true);
    } catch (error) {
        console.log(error)
        return serverError_Response(res);
    }
}

const resetOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return allFieldsResponse(res);
        const user = await UserModel.findOne({ email });
        if (!user) return notFound_Response(res, "User not found");
        //6 digit otp
        const otp = Math.floor(100000 + Math.random() * 900000);
        //Date.now() + 5 minutes
        const otp_expire = Date.now() + 5 * 60 * 1000;
        user.otp = otp;
        user.otpExpiry = otp_expire;
        await user.save();
        const mailResponse = await sendOtpMail(email, otp);
        if (mailResponse.includes("failed")) {
            return serverError_Response(res, mailResponse);
        }
        return successResponse(res, "OTP reset successfully");
    } catch (error) {
        console.log(error)
        return serverError_Response(res);
    }
}
const me = async (req, res) => {
    try {
        const user = req.user;
        return successResponse(res, "User details fetched successfully", user);

    } catch (error) {
        return serverError_Response(res);
    }
}
const address = async (req, res) => {
    try {
        // const user = req.user;
        const id = req.params.id
        await UserModel.findByIdAndUpdate(id, {
            $push: {
                shipping_address: {
                    ...req.body
                }
            }
        })

        return successResponse(res, "User address fetched successfully");

    } catch (error) {
        return serverError_Response(res);
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("user_token");
        return successResponse(res, "Logout successful");
    } catch (error) {
        return serverError_Response(res);
    }
}




module.exports = {
    register,
    login,
    verifyOtp,
    resetOtp,
    me,
    logout,
    address
}