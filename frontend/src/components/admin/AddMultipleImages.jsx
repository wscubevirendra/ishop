"use client";
import axios from "axios";
import { useRef } from "react";
import { FiTag, FiLink, FiImage } from "react-icons/fi";
import { axiosInstance, createSlug, notify } from "@/helper/helper";
import { useRouter } from "next/navigation";

function AddMultipleImages({ id, images, imageBaseUrl }) {
    const router = useRouter()
    function submitHandler(event) {
        event.preventDefault();
        const form = new FormData();
        for (let img of event.target.other_images.files) {
            form.append("image", img)
        }

        axiosInstance.post(`product/images/${id}`, form).then((response) => {
            if (response.data.success) {
                router.push("/admin/product")
            }
            notify(response.data.message, response.data.success)
        }).catch((error) => {
            console.log(error)
            notify("Internal Server Error", false);
        })


    }
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-6">
            {/* HEADER */}
            <div className="mb-4">
                <h1 className="text-3xl font-bold">Add Product Images</h1>

            </div>

            {/* FORM */}
            <form onSubmit={submitHandler} className="space-y-2">

                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Category Image
                    </label>
                    <div className="mt-2 flex items-center gap-3 border rounded-xl px-4 py-3">
                        <FiImage className="text-gray-400" />
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            name="other_images"
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-orange-50 file:text-[#ff7b00]
                            hover:file:bg-orange-100"
                        />


                    </div>

                </div>
                <div className="flex gap-2">
                    {images.map((data, index) => {
                        const path = `${imageBaseUrl}others/${data}`
                        return (
                            <img className="w-20 h-10 rounded-2xl" src={path} />
                        )
                    })}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center justify-end gap-4 pt-6">


                    <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-[#ff7b00] text-white hover:opacity-90"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}


export default AddMultipleImages;