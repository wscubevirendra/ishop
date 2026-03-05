import React from 'react'
import { fetchProduct } from '@/api/api-call';
import ProductCard from '@/components/website/ProductCard';

export default async function page({ params, searchParams }) {
    const promise = await params;
    const searchParam_Promise = await searchParams
    const categorySlug = promise.category_slug ?? null;
    const brand_slug = searchParam_Promise.brand_slug ?? null;
    const color_slug = searchParam_Promise.color_slug ?? null;
    const { product, imageBaseUrl } = await fetchProduct({ status: true, category_slug: categorySlug, brand_slug, color_slug });
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {
                product.map((prod) => {
                    return <ProductCard imageBaseUrl={imageBaseUrl} product={prod} key={prod._id} />
                })
            }

        </div>
    )
}
