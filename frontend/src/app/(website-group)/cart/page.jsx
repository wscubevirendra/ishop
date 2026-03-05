'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { formatIndianCurrency } from '@/helper/helper';
import Link from 'next/link';

export default function page() {
    const cart = useSelector((store) => store.cart);
    return (
        <div class="min-h-screen bg-gray-100 p-6">
            <div class="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-6">
                    {
                        cart.items.map((data) => {
                            return (
                                <div class="bg-white rounded-2xl shadow-sm p-6 flex gap-6 items-center">
                                    <div class="relative w-40 h-40 bg-gray-50 rounded-xl flex items-center justify-center">
                                        <span class="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                                            SAVE {data.discount_percentage} %
                                        </span>
                                        <img src={data.thumbnail} class="h-32 object-contain" />
                                    </div>


                                    <div class="flex-1">
                                        <h2 class="font-semibold text-lg">
                                            {data.name}
                                        </h2>

                                        <p class="text-red-500 text-xl font-bold mt-2">{formatIndianCurrency(data.original_price)}</p>


                                        <div class="flex items-center gap-4 mt-4">
                                            <div class="flex items-center border rounded-lg overflow-hidden">
                                                <button class="px-4 py-2 hover:bg-gray-100">-</button>
                                                <span class="px-4 py-2">{data.qty}</span>
                                                <button class="px-4 py-2 hover:bg-gray-100">+</button>
                                            </div>

                                            <span class="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                                                FREE SHIPPING
                                            </span>
                                        </div>

                                        <div class="mt-3 text-green-600 text-sm">
                                            {data.stock ? "in stock" : "out of stock"}
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>


                <div class="bg-white rounded-2xl shadow-sm p-6 h-fit border border-green-500">
                    <h2 class="text-lg font-semibold mb-6">Order Summary</h2>

                    <div class="space-y-4 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-500">Sub Total:</span>
                            <span class="font-medium">{formatIndianCurrency(cart.original_total)}</span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-500">Shipping estimate:</span>
                            <span class="font-medium">0</span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-500">Saving:</span>
                            <span class="font-medium">{formatIndianCurrency(cart.original_total - cart.final_total)}</span>
                        </div>

                        <hr />

                        <div class="flex justify-between text-base font-semibold">
                            <span>ORDER TOTAL:</span>
                            <span>{formatIndianCurrency(cart.final_total)}</span>
                        </div>
                        <Link href="/checkout">
                            <button class="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl transition">
                                CHECKOUT
                            </button></Link>

                    </div>
                </div>

            </div>
        </div >
    )
}
