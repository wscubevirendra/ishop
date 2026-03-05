import { fetchCategory, fetchProduct } from "@/api/api-call";
import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBtn";

import {
    FiEdit,
    FiTrash2,
    FiPlus,
} from "react-icons/fi";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ViewButton from "@/components/admin/ViewButton";


export default async function page() {
    const { product, imageBaseUrl } = await fetchProduct();


    return (
        <div className="bg-white rounded-2xl shadow p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Product Management</h2>

                </div>

                {/* SINGLE BUTTON */}
                <Link href="/admin/product/add">
                    <button className="flex items-center gap-2 bg-[#ff7b00] text-white px-5 py-2 rounded-xl hover:opacity-90 transition">
                        <FiPlus size={18} />
                        Add Product
                    </button>
                </Link>

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm">
                            <th className="p-4 text-left rounded-l-xl">image</th>
                            <th className="p-4 text-left rounded-l-xl">Name</th>
                            <th className="p-4 text-left">Slug</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left rounded-r-xl">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {product.map(
                            (prod) => {
                                return (
                                    <tr
                                        key={prod._id}
                                        className="border-t hover:bg-orange-50 transition"
                                    >
                                        <td className="p-4 font-medium">
                                            <img className="w-20 h-10 rounded-2xl" src={imageBaseUrl + "main/" + prod.thumbnail} alt="missing" />
                                        </td>
                                        <td className="p-4 font-medium">
                                            {prod.name}
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {prod.slug}
                                        </td>


                                        {/* STATUS */}
                                        <td className="p-2 flex gap-1">
                                            <StatusBadge flag="status" status={prod.status} api={`product/status/${prod._id}`} />


                                        </td>

                                        {/* ACTIONS */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <button className="p-2 rounded-lg bg-orange-100 text-[#ff7b00] hover:bg-orange-200">
                                                    <Link href={`/admin/product/edit/${prod._id}`}> <FiEdit /></Link>
                                                </button>
                                                <DeleteBtn api={`product/delete/${prod._id}`} />
                                                <ViewButton product={prod} imageBaseUrl={imageBaseUrl} />
                                                <button className="p-2 rounded-lg bg-orange-100 text-[#ff7b00] hover:bg-orange-200">
                                                    <Link href={`/admin/product/other_images/${prod._id}`}> Add</Link>
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

