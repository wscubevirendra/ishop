"use client";
import axios from "axios";
import { useRef } from "react";
import { FiTag, FiLink, FiImage } from "react-icons/fi";
import { axiosInstance, createSlug, notify } from "@/helper/helper";
import { useRouter } from "next/navigation";

function EditCategory({ category, imageBaseUrl }) {
    const router = useRouter();
    const nameRef = useRef();
    const slugRef = useRef();

    function generateSlug() {
        const slug = createSlug(nameRef.current.value)
        slugRef.current.value = slug;
    }


    function submitHandler(event) {
        event.preventDefault();
        const form = new FormData();
        if (nameRef.current.value !== category.name) {
            form.append("name", nameRef.current.value);
            form.append("slug", slugRef.current.value);
        }

        form.append("image", event.target.categoryImage.files[0]);
        axiosInstance.put(`category/update/${category._id}`, form).then((response) => {

            if (response.data.success) {
                router.push("/admin/category")
            }
            notify(response.data.message, response.data.success)
        }).catch((error) => {
            notify("Internal Server Error", false);
        })


    }
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-6">
            {/* HEADER */}
            <div className="mb-4">
                <h1 className="text-3xl font-bold">Add Category</h1>

            </div>

            {/* FORM */}
            <form onSubmit={submitHandler} className="space-y-2">
                {/* CATEGORY NAME */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Category Name
                    </label>
                    <div className="mt-2 flex items-center gap-3 border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff7b00]">
                        <FiTag className="text-gray-400" />
                        <input
                            ref={nameRef}
                            defaultValue={category.name}
                            onChange={generateSlug}
                            type="text"
                            placeholder="Enter category name"
                            className="w-full outline-none"
                        />
                    </div>
                </div>

                {/* SLUG */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Slug
                    </label>
                    <div className="mt-2 flex items-center gap-3 border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff7b00]">
                        <FiLink className="text-gray-400" />
                        <input
                            ref={slugRef}
                            readOnly
                            type="text"
                            defaultValue={category.slug}
                            placeholder="enter-category-slug"
                            className="w-full outline-none"
                        />
                    </div>
                </div>

                {/* CATEGORY IMAGE */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Category Image
                    </label>
                    <div className="mt-2 flex items-center gap-3 border rounded-xl px-4 py-3">
                        <FiImage className="text-gray-400" />
                        <input
                            type="file"
                            accept="image/*"
                            name="categoryImage"
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-orange-50 file:text-[#ff7b00]
                            hover:file:bg-orange-100"
                        />
                        <img className="w-20 h-10 rounded-2xl" src={imageBaseUrl + category.image} alt={category.name} />
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center justify-end gap-4 pt-6">
                    <button
                        type="button"
                        className="px-6 py-2 rounded-xl border text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-[#ff7b00] text-white hover:opacity-90"
                    >
                        Save Category
                    </button>
                </div>
            </form>
        </div>
    );
}


export default EditCategory;