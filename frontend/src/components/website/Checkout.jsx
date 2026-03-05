'use client'
import { axiosInstance, formatIndianCurrency, notify } from "@/helper/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus, FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";


export default function CheckoutPage({ user }) {
    const { error, isLoading, Razorpay } = useRazorpay();
    const dispatch = useDispatch();
    const router = useRouter();
    const cart = useSelector((store) => store.cart);
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(null); // 0 COD, 1 Online

    // Dummy handler without API
    function orderHandler() {
        if (selectedAddress === null) {
            notify("Please select address", false)
            return;
        }
        axiosInstance.post("order/place", {
            user_id: user._id,
            payment_mode: paymentMethod,
            shipping_details: user.shipping_address[selectedAddress]


        }).then((response) => {
            if (paymentMethod === 0) {
                console.log(response.data?.data)
                //COD 
                if (response.data.success) {
                    //navigate thank-you
                    router.push(`/thank-you/${response.data.data}`)
                    dispatch(removeToCart())
                }

            } else {

                const options = {
                    key: "rzp_test_hYGOo0vBKlVRkD",
                    currency: "INR",
                    name: "WsCube Tech",
                    description: "Test Transaction",
                    order_id: response.data?.data.razorpay_order_id, // Generate order_id on server
                    handler: (Razorpayresponse) => {
                        axiosInstance.post("order/success",
                            {
                                order_id:response.data?.data.order_id,
                                user_id: user?._id,
                                razorpay_response: Razorpayresponse
                            }
                        ).then(
                            (successresponse) => {
                                console.log(successresponse)
                                if (successresponse.data.status) {
                                    router.push(`/thank-you/${response.data.order_id}`)
                                    dispatch(removeToCart())
                                }
                            }
                        ).catch(
                            (err) => {
                                console.log(err)
                            }
                        )
                    },
                    prefill: {
                        name: user.name,
                        email: user.email,
                        contact: "8947083784",
                    },
                    theme: {
                        color: "#F37254",
                    },
                };

                const razorpayInstance = new Razorpay(options);
                razorpayInstance.open();
            };



        }).catch(
            (error) => {
                console.log(error)
                notify("Order Not complete", false)

            }
        )

    }

    return (
        <div className="bg-gray-100 min-h-screen p-6">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT SECTION */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Add Address */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <button className="flex items-center gap-2 text-blue-600 font-semibold hover:underline">
                            <FaPlus /> Add New Address
                        </button>
                    </div>

                    {/* Saved Addresses */}
                    <div className="bg-white p-5 rounded-xl shadow">

                        <h2 className="text-lg font-semibold mb-4">
                            Select Delivery Address
                        </h2>

                        <div className="space-y-4">

                            {user.shipping_address.map((item, index) => (

                                <div
                                    key={index}
                                    onClick={() => setSelectedAddress(index)}
                                    className={`border rounded-xl p-4 cursor-pointer transition 
                                    
                                    ${selectedAddress === index
                                            ? "border-blue-600 bg-blue-50"
                                            : "border-gray-200 hover:border-blue-400"
                                        }`}
                                >

                                    <p className="text-sm text-gray-600">
                                        {item.addressLine1}
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        {item.addressLine2}, {item.city}
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        state - {item.postalCode}
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        {item.country}
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        Phone: {item.contact}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* Payment Method */}
                    <div className="bg-white p-5 rounded-xl shadow">

                        <h2 className="text-lg font-semibold mb-4">
                            Payment Method
                        </h2>

                        {/* COD */}
                        <div
                            onClick={() => setPaymentMethod(0)}
                            className={`border p-4 rounded-xl cursor-pointer flex items-center gap-3 mb-3
                            
                            ${paymentMethod === 0
                                    ? "border-blue-600 bg-blue-50"
                                    : "border-gray-200"
                                }`}
                        >

                            <FaMoneyBillWave className="text-green-600" />

                            Cash on Delivery

                        </div>

                        {/* Online */}
                        <div
                            onClick={() => setPaymentMethod(1)}
                            className={`border p-4 rounded-xl cursor-pointer flex items-center gap-3
                            
                            ${paymentMethod === 1
                                    ? "border-blue-600 bg-blue-50"
                                    : "border-gray-200"
                                }`}
                        >

                            <FaCreditCard className="text-purple-600" />

                            Online Payment

                        </div>

                    </div>

                </div>

                {/* RIGHT SECTION */}
                <div className="bg-white p-5 rounded-xl shadow h-fit">

                    <h2 className="text-lg font-semibold mb-4">
                        Order Summary
                    </h2>

                    <div className="space-y-3 text-sm">

                        <div className="flex justify-between">
                            <span>Price</span>
                            <span>
                                {formatIndianCurrency(cart.original_total)}
                            </span>
                        </div>

                        <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>
                                - {formatIndianCurrency((cart.original_total) - (cart.final_total))}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Delivery Charges</span>
                            <span className="text-green-600">
                                FREE
                            </span>
                        </div>

                        <hr />

                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total Amount</span>
                            <span>
                                {formatIndianCurrency(cart.final_total)}
                            </span>
                        </div>

                    </div>

                    <button
                        onClick={orderHandler}
                        className="w-full mt-6 bg-teal-500 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold"
                    >
                        Place Order
                    </button>

                </div>

            </div>

        </div>
    );
}