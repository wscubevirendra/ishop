import { formatIndianCurrency } from "@/helper/helper";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product, imageBaseUrl, user }) => {
    const imageUrl = `${imageBaseUrl}main/${product.thumbnail}`
    return (
        <div className="relative bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden group">

            {/* BADGES */}
            <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                {product.best_seller && (
                    <span className="bg-orange-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                        Best Seller
                    </span>
                )}

                {product.is_hot && (
                    <span className="bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                        New
                    </span>
                )}
            </div>

            {/* DISCOUNT */}
            {product.discount_percentage && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded z-10">
                    {product.discount_percentage}% OFF
                </span>
            )}

            {/* IMAGE */}
            <div className="h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            {/* CONTENT */}
            <div className="p-3 space-y-1">

                <h3 className="text-sm font-medium text-gray-800">
                    {product.name}
                </h3>

                <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-gray-900">
                        {formatIndianCurrency(product.final_price)}
                    </span>

                    {product.original_price && (
                        <span className="text-xs line-through text-gray-400">
                            {formatIndianCurrency(product.original_price)}
                        </span>
                    )}
                </div>

                {!product.stock && (
                    <p className="text-xs text-red-500 font-medium">
                        Out of Stock
                    </p>
                )}

            </div>

            <AddToCartButton user={user} stock={product.stock} id={product._id} name={product.name} final_price={product.final_price} original_price={product.original_price} discount_percentage={product.discount_percentage} thumbnail={imageUrl} color_ids={product.color_ids} />

        </div>
    );
};

export default ProductCard;
