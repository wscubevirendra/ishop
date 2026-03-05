'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { axiosInstance, notify } from "@/helper/helper";
import { useRouter } from "next/navigation";
import { stringify } from "postcss";
export default function LoginPage() {


  const router = useRouter()
  const [showPass, setShowPass] = useState(false);
  const cart = JSON.parse(localStorage.getItem("cart"));
  const cartData = cart ? cart.items : null;
  function submitHandler(event) {
    event.preventDefault();
    const payload = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    if (!payload.email || !payload.password) {
      notify("All fields are required", false);
      return;
    }
    if (payload.password.length < 6) {
      notify("Password must be at least 6 characters", false);
      return;
    }
    axiosInstance.post("user/login", payload).then((response) => {
      if (response.data.success) {
        axiosInstance.post("cart/cart-sync", {
          cart: cartData,
          user_id: response.data?.data.id
        }).then(
          (cart_response) => {
            const cartResponse = cart_response.data.data.cart;
            let final_total = 0;
            let original_total = 0;
            const items = cartResponse.map((data) => {
              // console.log(data.qty, "qty")a
              const { _id, final_price, original_price, discount_percentage, thumbnail, stock, name } = data.productId;
              final_total += Number(data.qty * final_price);
              original_total += Number(data.qty * original_price);

              return {
                name,
                id: _id,
                final_price,
                original_price,
                discount_percentage,
                thumbnail: `http://localhost:5000/images/product/main/${thumbnail}`,
                stock,
                qty: data.qty
              }
            });
            console.log(items)
            console.log(final_total,
              original_total)

            localStorage.setItem("cart", JSON.stringify({
              items,
              final_total,
              original_total
            }))

          }
        ).catch(
          (error) => {
            console.log(error)
          }
        )
        // router.push("/");
      }
      notify(response.data.message, response.data.success)
    }).catch((error) => {
      console.log(error, "response")
      notify("Internal Server Error", false);
    })


  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg grid md:grid-cols-2 overflow-hidden">

        {/* Left Branding */}
        <div className="hidden md:flex items-center justify-center bg-teal-600 text-white p-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Welcome Back 👋</h2>
            <p className="text-teal-100">
              Login to continue shopping and manage your account.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="p-10">
          <h2 className="text-2xl font-semibold text-teal-600 text-center">
            Sign In
          </h2>

          <form onSubmit={submitHandler} className="mt-8 space-y-5">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 outline-none"
                placeholder="example@gmail.com"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 outline-none"
                  placeholder="••••••"
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="text-right text-sm">
              <Link href="#" className="text-teal-600">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md transition">
              LOGIN
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link href="/register" className="text-teal-600 font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}