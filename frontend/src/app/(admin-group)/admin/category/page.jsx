import { fetchCategory } from "@/api/api-call";
import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBtn";

import {
  FiEdit,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";
import DeleteBtn from "@/components/admin/DeleteBtn";


export default async function page() {
  const { category, imageBaseUrl } = await fetchCategory();
  console.log(category,"category")

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-gray-500 text-sm">
            Manage users, roles and status
          </p>
        </div>

        {/* SINGLE BUTTON */}
        <Link href="/admin/category/add">
          <button className="flex items-center gap-2 bg-[#ff7b00] text-white px-5 py-2 rounded-xl hover:opacity-90 transition">
            <FiPlus size={18} />
            Add Category
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
            {category.map(
              (cat) => {
                console.log(imageBaseUrl + cat.image)
                return (
                  <tr
                    key={cat._id}
                    className="border-t hover:bg-orange-50 transition"
                  >
                    <td className="p-4 font-medium">
                      <img className="w-20 h-10 rounded-2xl" src={imageBaseUrl + cat.image} alt="missing" />
                    </td>
                    <td className="p-4 font-medium">
                      {cat.name}
                    </td>
                    <td className="p-4 text-gray-600">
                      {cat.slug}
                    </td>
                    {/* <td className="p-4">
                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100">
                    {user.role}
                  </span>
                </td> */}

                    {/* STATUS */}
                    <td className="p-2 flex gap-1">
                      <StatusBadge flag="status" status={cat.status} api={`category/status/${cat._id}`} />
                      <StatusBadge flag="is_home" status={cat.is_home} api={`category/status/${cat._id}`} />
                      <StatusBadge flag="is_best" status={cat.is_best} api={`category/status/${cat._id}`} />
                      <StatusBadge flag="is_top" status={cat.is_top} api={`category/status/${cat._id}`} />
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button className="p-2 rounded-lg bg-orange-100 text-[#ff7b00] hover:bg-orange-200">
                          <Link href={`/admin/category/edit/${cat._id}`}> <FiEdit /></Link>
                        </button>
                        <DeleteBtn api={`category/delete/${cat._id}`} />
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

