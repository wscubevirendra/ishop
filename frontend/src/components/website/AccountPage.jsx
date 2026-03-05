'use client'

import { notify, axiosInstance } from "@/helper/helper";
import { useState } from "react";



export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("account");

  const tabClass = (tab) =>
    `flex justify-between items-center px-4 py-3 rounded-lg cursor-pointer transition-all ${activeTab === tab
      ? "bg-teal-600 text-white"
      : "bg-gray-100 hover:bg-gray-200"
    }`;



  function submitHandler(event) {
    event.preventDefault();
    const form = {
      addressLine1: event.target.addressLine1.value,
      addressLine2: event.target.addressLine2.value,
      city: event.target.city.value,
      postalCode: event.target.postalCode.value,
      state: event.target.state.value,
      country: event.target.country.value,
      contact: event.target.contact.value,
    };

    axiosInstance.post("user/address", form).then((response) => {
      console.log(response)

      if (response.data.success) {
        event.target.reset();
      }
      notify(response.data.message, response.data.success)
    }).catch((error) => {
      console.log(error, "response")
      notify("Internal Server Error", false);
    })


  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-gray-200 rounded-xl p-6 flex gap-8">

        {/* Sidebar */}
        <div className="w-1/4 bg-gray-100 rounded-xl p-6">
          <div className="w-40 h-40 bg-gray-300 rounded-xl mx-auto"></div>

          <h2 className="text-xl font-semibold mt-6">Mark Cole</h2>
          <p className="text-gray-500 text-sm mb-6">swoo@gmail.com</p>

          <div className="space-y-3">
            <div
              className={tabClass("account")}
              onClick={() => setActiveTab("account")}
            >
              <span>Account info</span>
              <span>→</span>
            </div>

            <div
              className={tabClass("orders")}
              onClick={() => setActiveTab("orders")}
            >
              <span>My order</span>
              <span>→</span>
            </div>

            <div
              className={tabClass("address")}
              onClick={() => setActiveTab("address")}
            >
              <span>My address</span>
              <span>→</span>
            </div>

            <div
              className={tabClass("password")}
              onClick={() => setActiveTab("password")}
            >
              <span>Change password</span>
              <span>→</span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-3/4">

          {/* Account Info */}
          {activeTab === "account" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Account Info</h2>
              <form onSubmit={submitHandler}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm">
                      Address Line1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="addressLine1"
                      defaultValue="Mark"
                      className="w-full p-3 rounded-lg border bg-gray-100"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block  mb-2 text-sm">
                      Address Line2 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      defaultValue="Cole"
                      className="w-full p-3 rounded-lg border bg-gray-100"
                    />
                  </div>



                  <div className="col-span-2">
                    <label className="block mb-2 text-sm">
                      Phone Number <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      defaultValue="+1 0231 4554 452"
                      className="w-full p-3 rounded-lg border bg-gray-100"
                    />
                  </div>
                  <div >
                    <label className="block mb-2 text-sm">
                      City <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      defaultValue="+1 0231 4554 452"
                      className="w-full p-3 rounded-lg border bg-gray-100"
                    />
                  </div>
                  <div >
                    <label className="block mb-2 text-sm">
                      postal Code  <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      defaultValue="+1 0231 4554 452"
                      className="w-full p-3 rounded-lg border bg-gray-100"
                    />
                  </div>
                  <div >
                    <label className="block mb-2 text-sm">
                      state  <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      defaultValue="+1 0231 4554 452"
                      className="w-full p-3 rounded-lg border bg-gray-100"
                    />
                  </div>
                  <div >
                    <label className="block mb-2 text-sm">
                      Country  <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      defaultValue="+1 0231 4554 452"
                      className="w-full p-3 rounded-lg border bg-gray-100"
                    />
                  </div>
                </div>

                <button className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition">
                  SAVE
                </button>

              </form>

            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500">No orders found.</p>
              </div>
            </div>
          )}

          {/* Address */}
          {activeTab === "address" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">My Address</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500">No address added.</p>
              </div>
            </div>
          )}

          {/* Change Password */}
          {activeTab === "password" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Change Password</h2>

              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 rounded-lg border bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 rounded-lg border bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 rounded-lg border bg-gray-100"
                  />
                </div>
              </div>

              <button className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition">
                UPDATE PASSWORD
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}