"use client";
import { useRef, useState } from "react";
import { FiTag, FiLink, FiImage, FiDollarSign } from "react-icons/fi";
import { axiosInstance, createSlug, notify } from "@/helper/helper";
import Select from 'react-select'
import { useRouter } from "next/navigation";

export default function AddProduct({ category, brand, color }) {
    const router = useRouter();
    const [SelColors, setSelColors] = useState([]);
    const nameRef = useRef();
    const slugRef = useRef();
    const originalPriceRef = useRef();
    const discountRef = useRef();
    const finalPriceRef = useRef();
    const descriptionRef = useRef();

    function colorIdsSet(data) {
        const colors = data.map(o => o.value);
        setSelColors(colors)
    }

    function generateSlug() {
        const slug = createSlug(nameRef.current.value);
        slugRef.current.value = slug;
    }

    function calculateDiscountPer() {
        let op = Number(originalPriceRef.current.value);
        let fp = Number(finalPriceRef.current.value);
        if (op < fp || fp > op) {
            alert("invalid value")
            return
        }
        const dp = ((op - fp) / op) * 100;
        discountRef.current.value = parseInt(dp);
    }

    function submitHandler(event) {
        event.preventDefault();

        const form = new FormData();
        form.append("name", nameRef.current.value);
        form.append("slug", slugRef.current.value);
        form.append("original_price", originalPriceRef.current.value);
        form.append("discount_percentage", discountRef.current.value);
        form.append("final_price", finalPriceRef.current.value);
        form.append("description", descriptionRef.current.value);
        form.append("category_id", event.target.category.value);
        form.append("brand_id", event.target.brand.value);
        form.append("color_ids", JSON.stringify(SelColors));
        form.append("thumbnail", event.target.thumbnail.files[0]);

        axiosInstance.post("product/create", form)
            .then((response) => {
                notify(response.data.message, response.data.success);
                if (response.data.success) {
                    event.target.reset();
                    router.push("/admin/product")
                }
            })
            .catch(() => {
                notify("Internal Server Error", false);
            });
    }

    return (
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                Add Product
            </h1>

            <form onSubmit={submitHandler} className="space-y-6">

                {/* Product Name + Slug */}
                <div className="grid md:grid-cols-2 gap-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Product Name
                        </label>
                        <input
                            ref={nameRef}
                            name="name"
                            onChange={generateSlug}
                            type="text"
                            placeholder="Enter product name"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Slug
                        </label>
                        <input
                            ref={slugRef}
                            name="slug"
                            readOnly
                            type="text"
                            placeholder="auto-generated-slug"
                            className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-3"
                        />
                    </div>

                </div>

                {/* Price Section */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Original Price
                        </label>
                        <input
                            ref={originalPriceRef}
                            onChange={calculateDiscountPer}
                            name="original_price"
                            type="number"
                            placeholder="₹ 0.00"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Discount %
                        </label>
                        <input
                            ref={discountRef}
                            readOnly
                            name="discount_percentage"
                            type="number"
                            placeholder="0%"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Final Price
                        </label>
                        <input
                            ref={finalPriceRef}
                            onChange={calculateDiscountPer}
                            name="final_price"
                            type="number"
                            placeholder="₹ 0.00"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Description
                    </label>
                    <textarea
                        ref={descriptionRef}
                        name="description"
                        rows="4"
                        placeholder="Write product description..."
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
                    />
                </div>

                {/* Category / Brand / Colors */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Category ID
                        </label>
                        <Select name="category" options={
                            category.map((cat) => (
                                { value: cat._id, label: cat.name }
                            ))
                        } />



                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Brand ID
                        </label>
                        <Select name="brand" options={
                            brand.map((br) => (
                                { value: br._id, label: br.name }
                            ))
                        } />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Color IDs
                        </label>
                        <Select isMulti closeMenuOnSelect={false} onChange={colorIdsSet} options={
                            color.map((col) => (
                                { value: col._id, label: col.name }
                            ))
                        } />
                    </div>
                </div>

                {/* Thumbnail */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Product Image
                    </label>
                    <input
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        className="w-full border border-dashed border-gray-300 rounded-xl p-4 cursor-pointer
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-orange-50 file:text-orange-600
          hover:file:bg-orange-100"
                    />
                </div>

                {/* Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-8 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition shadow-sm"
                    >
                        Save Product
                    </button>
                </div>

            </form>
        </div>
    );

}
