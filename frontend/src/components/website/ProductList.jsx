import React from 'react'

const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        price: 1999,
        image: "https://via.placeholder.com/300",
        description: "High quality wireless headphones with noise cancellation."
    },
    {
        id: 2,
        title: "Smart Watch",
        price: 2999,
        image: "https://via.placeholder.com/300",
        description: "Track your fitness and notifications on the go."
    },
    {
        id: 3,
        title: "Bluetooth Speaker",
        price: 1499,
        image: "https://via.placeholder.com/300",
        description: "Portable speaker with powerful sound."
    }
];

const ProductList = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Our Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
};


const ProductCard = ({ product }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
            />

            <div className="p-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600 text-sm mt-1">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-green-600">
                        ₹{product.price}
                    </span>

                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ProductList;
