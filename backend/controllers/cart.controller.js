const { serverError_Response, successResponse } = require("../utilts/response")
const CartModel = require("../models/cart.model")

const cartSync = async (req, res) => {
    try {
        const { cart, user_id } = req.body;
        if (cart.length > 0) {
            await Promise.all(
                cart.map(
                    async (item) => {
                        console.log(item)
                        const cartItem = await CartModel.findOne({
                            userId: user_id,
                            productId: item.id
                        });

                        if (cartItem) {
                            cartItem.qty++;
                            await cartItem.save()
                        } else {
                            await CartModel.create({
                                userId: user_id,
                                productId: item.id,
                                qty: 1
                            })

                        }

                    })
            )
        }


        const Data = await CartModel.find({ userId: user_id }).populate("productId", "_id name slug original_price final_price thumbnail discount_percentage stock"
        )

        return successResponse(res, "Cart Data", { cart: Data })

    } catch (error) {
        console.log(error)
        return serverError_Response(res)
    }
}
const addTocart = async (req, res) => {
    try {
        const { productId, user_id, flag } = req.body;
        const cartItem = await CartModel.findOne({
            userId: user_id,
            productId: productId
        });

        if (cartItem) {
            if (flag === 1) {
                cartItem.qty++;

            } else {
                cartItem.qty--;

            }
            await cartItem.save()
        } else {
            await CartModel.create({
                userId: user_id,
                productId: item.id,
                qty: 1
            })

        }
        return successResponse(res, "Cart Data Add",)

    } catch (error) {
        return serverError_Response(res)
    }
}

module.exports = {
    cartSync,
    addTocart
}