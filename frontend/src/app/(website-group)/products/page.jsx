import { fetchProduct, getUser } from "@/api/api-call"
import ProductCard from "@/components/website/ProductCard"

export default async function page({ searchParams }) {
    const promise = await searchParams;
    const brand_slug = promise.brand_slug ?? null;
    const color_slug = promise.color_slug ?? null;
    const min_price = promise.min_price ?? null;
    const max_price = promise.max_price ?? null;
    const sort = promise.sort ?? null;
    const limit = promise.limit ?? null;
    const user =await getUser();
    const { product, imageBaseUrl } = await fetchProduct({ status: true, brand_slug, color_slug, min_price, max_price, sort, limit })

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {

                product.map((prod) => {
                    return <ProductCard user={user} imageBaseUrl={imageBaseUrl} product={prod} key={prod._id} />
                })

            }

        </div>

    )
}


