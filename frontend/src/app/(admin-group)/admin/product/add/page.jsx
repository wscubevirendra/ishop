import { fetchBrand, fetchColor, fetchCategory } from '@/api/api-call';
import AddProduct from '@/components/admin/AddProduct'
import React from 'react'

export default async function page() {
    const { category } = await fetchCategory();
    const { brand } = await fetchBrand();
    const { color } = await fetchColor();
 

    return (
        <AddProduct category={category} brand={brand} color={color} />
    )
}
