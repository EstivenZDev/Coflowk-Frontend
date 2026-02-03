"use client"

import React, { useEffect, useState } from 'react'
import useAuthStore from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { getProducts } from '@/services/products/products'

export const Dashboard = () => {
    const user = useAuthStore((state)=> state.user)
    const isAuthenticated = useAuthStore((state)=> state.isAuthenticated)
    const logout = useAuthStore((state)=>state.logout)
    const router = useRouter()
    const [products, setProducts] = useState([])

    useEffect(()=>{
        if(!isAuthenticated){
            router.replace("/")
        }

        const fetchProducts = async ( ) => {
            const data = await getProducts()
            setProducts(data)
        }

        fetchProducts()
    },[isAuthenticated, router])

    if (!isAuthenticated) return null


  return (
    <>
    <section className='flex w-screen h-screen'>
        <div className='w-60 bg-amber-600'>

        </div>
        <div className='bg-blue-400'>
            {products && products.map(product=>(
                <div key={product._id}>
                    {product.name}
                </div>
            ))}
        </div>
    </section>

    </>
  )
}

export default Dashboard
