'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function CategoryFilter({ categories }) {
  const pathname = usePathname();

  return (
    <div className='bg-[#EEEFF6] rounded-2xl shadow-sm p-5'>
      <h4 className="font-medium text-gray-800 mb-3">Categories</h4>

      <button
        className={`w-full mb-3 py-2 rounded-lg border transition font-medium
          ${pathname === '/products'
            ? 'bg-black text-white'
            : 'bg-gray-50 hover:bg-gray-100'
          }`}
      >
        All Categories
      </button>

      <ul className="space-y-2">
        {categories.map((cat) => {
          const active = pathname === `/products/${cat.slug}`

          return (
            <Link key={cat._id} href={`/products/${cat.slug}`}>
              <li
                className={`flex justify-between px-3 py-2 rounded-lg cursor-pointer transition
              ${active
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <span>{cat.name}</span>
                <span>({cat.count || 0})</span>
              </li>
            </Link>

          )
        })}
      </ul>
    </div>
  );
}
