'use client'
import { axiosInstance } from '@/helper/helper';
import { addToCart, changeQtyHandler } from '@/redux/reducers/CartSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function AddToCartButton(props) {
    console.log(props, "props")
    const cart = useSelector((store) => store.cart);
    const cartItem = cart.items.find((item) => item.id === props.id)
    const dispacher = useDispatch();
    async function cartHandler() {
        if (props.user != null) {
            try {
                const response = await axiosInstance.post("cart/add-to-cart", { user_id: user._id, productId: props._id })

            } catch (error) {

            }
        }

        dispacher(addToCart({ ...props, user: null }))
    }

    async function qtyHandler(id, flag) {
        if (props.user != null) {
            try {
                const response = await axiosInstance.post("cart/add-to-cart", { user_id: user._id, productId: props._id, flag })

            } catch (error) {

            }
        }
        dispacher(changeQtyHandler({ ...props, flag }))
    }
    return (
        < div className="p-3 pt-0" >
            {
                cartItem != null ?
                    <div className='flex gap-10'>
                        <button
                            onClick={() => qtyHandler(props.id, 1)}
                            className="w-full cursor-pointer bg-teal-500 text-white hover:bg-gray-800 py-1 rounded-lg text-sm font-medium transition"
                        >
                            +
                        </button>
                        {cartItem.qty}
                        <button
                            onClick={() => qtyHandler(props.id, 2)}
                            className="w-full cursor-pointer bg-teal-500 text-white hover:bg-gray-800 py-1 rounded-lg text-sm font-medium transition"
                        >
                            -
                        </button>
                    </div>
                    :
                    <button
                        onClick={cartHandler}
                        disabled={!props.stock}
                        className={`w-full py-2 rounded-lg text-sm font-medium transition
            ${props.stock
                                ? "bg-black text-white hover:bg-gray-800"
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                            }`}
                    >
                        {props.stock ? "Add To Cart" : "Unavailable"}
                    </button>

            }

        </div >
    )
}
