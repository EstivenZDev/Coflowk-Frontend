"use client"

import React, { useEffect, useState } from 'react'
import useAuthStore from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { getProducts } from '@/services/products/products'
import { CardAccions } from '@/components/CardAccions/CardAccions'

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
    <section className='flex w-full h-full  justify-center'>
        <div className='p-5 flex flex-wrap gap-20 '>
            <CardAccions text='Productos' link='/dashboard/products'/>
            <CardAccions text='Usuarios' link='/dashboard/shifts'/>
            <CardAccions text='Pedidos' link='/dashboard/shifts'/>
        </div>
    </section>

    </>
  )
}

export default Dashboard
