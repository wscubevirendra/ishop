'use client'

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function SortFilter() {

    const router = useRouter()
    const searchParams = useSearchParams()

    const urlLimit = searchParams.get('limit') || "0"
    const urlSort = searchParams.get('sort') || ""

    function handleLimitChange(e) {
        const value = e.target.value

        const query = new URLSearchParams(searchParams.toString())
        query.set('limit', value)

        router.push(`?${query.toString()}`)
    }

    function handleSortChange(e) {
        const value = e.target.value

        const query = new URLSearchParams(searchParams.toString())
        query.set('sort', value)

        router.push(`?${query.toString()}`)
    }

    return (
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600 bg-white p-3 rounded-lg shadow-sm">

            <p>1–40 of 120 results</p>

            <div className="flex gap-4">

                {/* LIMIT */}
                <select
                    className="border rounded px-2 py-1 bg-gray-50"
                    value={urlLimit}
                    onChange={handleLimitChange}
                >
                    <option value="0">All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>

                {/* SORT */}
                <select
                    className="border rounded px-2 py-1 bg-gray-50"
                    value={urlSort}
                    onChange={handleSortChange}
                >
                    <option value="">Latest</option>
                    <option value="asc">Price Low → High</option>
                    <option value="desc">Price High → Low</option>
                </select>

            </div>
        </div>
    )
}
