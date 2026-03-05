import { fetchProduct } from '@/api/api-call';
import React from 'react'
import AddMultipleImages from '@/components/admin/AddMultipleImages';

export default async function page({ params }) {
    const promise = await params;
    const id = promise.product_id
    const { product, imageBaseUrl } = await fetchProduct({ id })

    return (
        <AddMultipleImages id={id} imageBaseUrl={imageBaseUrl} images={product[0].other_images} />
    )
}
