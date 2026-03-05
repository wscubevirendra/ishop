import { getUser } from '@/api/api-call'
import CheckoutPage from '@/components/website/Checkout'
import React from 'react'

export default async function page() {
    const user = await getUser()
    return (
        <CheckoutPage user={user} />
    )
}
