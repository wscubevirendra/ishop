import Link from "next/link";

export default async function ThankYouPage({ params }) {
    const order = await params;
    const orderId = order.order_id
    console.log(orderId)

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6">

            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

                {/* Success Message */}
                <div className="text-center mb-8">
                    <div className="text-green-500 text-5xl mb-3">✔</div>
                    <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>
                    <p className="text-gray-500 mt-2">
                        Thank you for shopping with us.
                    </p>
                </div>

                {/* Order Info */}
                <div className="border-b pb-4 mb-6">
                    <p><span className="font-semibold">Order ID:</span> {orderId}</p>
                    <p><span className="font-semibold">Payment Status:</span> Successful</p>
                </div>


                {/* Buttons */}
                <div className="flex gap-4 justify-center">
                    <Link href="/">
                        <button className="bg-black text-white px-6 py-3 rounded-lg">
                            Continue Shopping
                        </button>
                    </Link>

                    <Link href="/profile">
                        <button className="border border-black px-6 py-3 rounded-lg">
                            View Orders
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
}