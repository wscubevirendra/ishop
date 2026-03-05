'use client'

import React from 'react'
import Link from 'next/link'
import { MdDashboard, MdCategory } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { usePathname } from 'next/navigation';



export default function SideMenu() {
    const pathname = usePathname();
    const items = [
        {
            name: "Dashboard",
            icon: <MdDashboard />,
            link: "/admin"
        },
        {
            name: "Category",
            icon: <MdCategory />,
            link: "/admin/category"
        },
        {
            name: "Product",
            icon: <IoIosColorPalette />,
            link: "/admin/product"
        },
        {
            name: "Brand",
            icon: <IoIosColorPalette />,
            link: "/admin/brand"
        },
        {
            name: "Color",
            icon: <IoIosColorPalette />,
            link: "/admin/color"
        },

    ]
    return (
        <aside className="w-64 h-screen bg-white shadow-2xl flex flex-col p-4">
            <div className='p-5'>
                <h2 className="text-2xl font-bold text-[#ff7b00] mb-4">Admin <span className='text-black'>Menu</span></h2>
            </div>
            <nav>
                {
                    items.map((item, index) => {
                        const isActive = pathname === item.link;
                        return (
                            <Link href={item.link} key={index}>
                                <div className={`flex items-center p-3 mb-2 text-gray-700 hover:bg-black hover:text-white rounded-lg cursor-pointer ${isActive ? 'bg-[#ff7b00] font-bold text-white' : ''}`}>
                                    <span className="mr-3">{item.icon}</span>
                                    <span>{item.name}</span>
                                    {isActive && <div className='w-2 h-2 rounded-full bg-white ms-auto'></div>}
                                </div>
                            </Link>
                        )

                    })
                }
            </nav>
        </aside>
    )
}
