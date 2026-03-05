
import { fetchCategory } from "@/api/api-call";
import React from "react";

export default async function CategoriesSection() {
  const { category, imageBaseUrl } = await fetchCategory({ limit: 2, status: true, is_top: true });



  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Shop by Category
      </h2>

      <div className=" grid grid-cols-5 max-w-7xl  gap-6">

        {category?.map((cat, index) => (
          <div
            key={index}
            className="flex-col flex items-center text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg "
          >

            {/* Image */}
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-xl mb-4 group-hover:bg-gray-200 transition">
              <img
                src={imageBaseUrl + cat.image}
                alt={cat.name}
                className="h-10 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Text */}
            <h4 className="text-sm font-semibold text-gray-900">
              {cat.name}
            </h4>

            <p className="text-xs text-gray-500 mt-1">
              2 Items
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}
