import React from 'react'

export default function page() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-gray-800">1,234</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-800">567</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-gray-800">$45,230</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Products</h3>
          <p className="text-3xl font-bold text-gray-800">892</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="pb-3 font-semibold text-gray-700">Action</th>
              <th className="pb-3 font-semibold text-gray-700">User</th>
              <th className="pb-3 font-semibold text-gray-700">Date</th>
              <th className="pb-3 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-3">New Order</td>
              <td className="py-3">John Doe</td>
              <td className="py-3">2024-01-15</td>
              <td className="py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded">Completed</span></td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-3">User Registration</td>
              <td className="py-3">Jane Smith</td>
              <td className="py-3">2024-01-14</td>
              <td className="py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Active</span></td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-3">Product Added</td>
              <td className="py-3">Admin User</td>
              <td className="py-3">2024-01-13</td>
              <td className="py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
