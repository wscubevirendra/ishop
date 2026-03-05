"use client";

import { FiSearch, FiBell, FiUser } from "react-icons/fi";

export default function Header() {hea
  return (
    <header className="h-18 bg-white  flex items-center justify-between px-6 shadow-sm">
      {/* LEFT - SEARCH */}
      <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl w-80">
        <FiSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <div className="relative cursor-pointer">
          <FiBell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ff7b00] rounded-full"></span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-9 h-9 bg-[#ff7b00] text-white rounded-full flex items-center justify-center font-semibold">
            R
          </div>
          <div className="text-sm">
            <p className="font-medium">Robert</p>
            <p className="text-gray-400 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
