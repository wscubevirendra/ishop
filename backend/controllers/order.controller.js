const { serverError_Response, successResponse, createResponse, notFound_Response } = require("../utilts/response")
const OrderModel = require("../models/order.model")
const CartModel = require("../models/cart.model");
const Razorpay = require('razorpay');
const crypto = require("crypto");
var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })

const place = async (req, res) => {
    try {
        const { user_id, payment_mode, shipping_details } = req.body;
        const cart = await CartModel.find({ userId: user_id }).populate("productId", "_id final_price");

        const productDetail = cart.map((item) => {
            return {
                qty: item.qty,
                product_id: item.productId._id,
                price: item.productId.final_price,
                total: item.qty * item.productId.final_price
            }
        })

        const order_total = productDetail.reduce(
            (sum, item) => sum + item.total,
            0 // ✅ always give initial value
        )

        const order = await OrderModel.create({
            user_id,
            product_details: productDetail,
            order_total: order_total,
            payment_mode,
            shipping_details

        })

        if (payment_mode === 0) {
            await CartModel.deleteMany({ user_id });
            return createResponse(res, "Order place", order._id);

        } else {
            var options = {
                amount: 100 * order_total,  // Amount is in currency subunits. 
                currency: "INR",
                receipt: order._id
            };
            instance.orders.create(options, async function (err, Razorder) {
                if (err) {
                    console.log(err)
                    return successResponse(res, "order not create")
                } else {
                    order.razorpay_order_id = Razorder.id;
                    await order.save();
                    return successResponse(res, "order sucessfully place", {
                        orderId: order._id,
                        razorpay_order_id: Razorder.id
                    })
                }
            });
        }



    } catch (error) {
        console.log(error)
        return serverError_Response(res)
    }
}

const orderSuccess = async (req, res) => {
    try {
        const { order_id, user_id, razorpay_response } = req.body;
        console.log(order_id)
        const order = await OrderModel.findById({ _id: order_id });
        console.log(order)
        return
        if (!order) {
            return notFound_Response(res)
        }
        // Verify the payment
        const generated_signature =
            crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(razorpay_response.razorpay_order_id + "|" + razorpay_response.razorpay_payment_id)
                .digest("hex");
        if (generated_signature !== razorpay_response.razorpay_signature) {
            return serverError_Response(res)
        }
        // Update order status to paid
        order.payment_status = 1;
        order.order_status = 1;
        order.razorpay_payment_id = razorpay_response.razorpay_payment_id;
        await order.save();
        await CartModel.deleteMany({ user_id });
        return res.status(200).json({
            success: true,
            message: "Order placed succesfully",
            order_id: order._id
        })

    } catch (error) {
        console.error("Error in order success:", error);
        return serverError_Response(res)
    }
}
module.exports = {
    place,
    orderSuccess
}