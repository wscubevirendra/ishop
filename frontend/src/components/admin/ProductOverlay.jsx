import React from "react";
import StatusBadge from "./StatusBtn";

const ProductOverlay = ({ product, isOpen, onClose, imageBaseUrl }) => {
    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            {/* Modal */}
            <div className="bg-white w-[90%] md:w-[900px] rounded-xl shadow-xl p-6 relative overflow-y-auto max-h-[90vh]">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-2xl font-semibold mb-1">{product.name}</h2>
                <p className="text-gray-500 mb-4">{product.description}</p>

                {/* Main Image */}
                <img
                    src={`${imageBaseUrl}main/${product.thumbnail}`}
                    alt={product.name}
                    className="w-full h-56 object-fit rounded-lg mb-4"
                />

                {/* Prices */}
                <div className="flex items-center gap-4 mb-4">
                    <span className="line-through text-gray-400">
                        ₹{product.original_price}
                    </span>
                    <span className="text-green-600 font-semibold text-lg">
                        ₹{product.final_price}
                    </span>
                    <span className="text-red-500 text-sm">
                        ({product.discount_percentage}% OFF)
                    </span>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <Info label="Category" value={product.category_id?.name} />
                    <Info label="Brand" value={product.brand_id?.name} />
                    <Info label="Stock" value={product.stock ? "In Stock" : "Out of Stock"} />
                    <Info label="Status" value={product.status ? "Active" : "Inactive"} />
                </div>

                {/* Colors */}
                {product.color_ids?.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-1">Available Colors</p>
                        <div className="flex gap-2">
                            {product.color_ids.map((color) => (
                                <div
                                    key={color._id}
                                    title={color.name}
                                    className="w-8 h-8 rounded-full border"
                                    style={{ backgroundColor: color.code }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Other Images */}
                {product.other_images?.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Other Images</p>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                            {product.other_images.map((img, index) => (
                                <img
                                    key={index}
                                    src={`${imageBaseUrl}other/${img}`}
                                    alt="product"
                                    className="h-20 w-full object-cover rounded-md border"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Flags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    <div className="flex flex-wrap gap-2">
                        <StatusBadge
                            url={`product/status/${product._id}`}
                            status={product.status}
                            flag="status"
                        />
                        <StatusBadge
                            url={`product/status/${product._id}`}
                            status={product.is_featured}
                            flag="is_featured"
                        />
                        <StatusBadge
                            url={`product/status/${product._id}`}
                            status={product.is_hot}
                            flag="is_hot"
                        />
                        <StatusBadge
                            url={`product/status/${product._id}`}
                            status={product.is_home}
                            flag="is_home"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

/* Reusable Components */
const Info = ({ label, value }) => (
    <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium">{value || "-"}</p>
    </div>
);

const Badge = ({ text }) => (
    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
        {text}
    </span>
);

export default ProductOverlay;
