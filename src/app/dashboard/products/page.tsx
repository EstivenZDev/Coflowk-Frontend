"use client"

import React, { useEffect, useState } from 'react'
import useAuthStore from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { deleteProduct, getProducts } from '@/services/products/products'
import ProductCard from '@/components/CardProducts/CardProducts'
import CreateProductModal from '@/components/CreatProductModal/CreateProductModal'
import { Product } from '@/types/product'


export const Dashboard = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const router = useRouter()
    const [products, setProducts] = useState<Product[]>([])
    const [openModal, setOpenModal] = useState(false)


    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/")
        }

        const fetchProducts = async () => {
            const data = await getProducts()
            setProducts(data)
        }

        if (isAuthenticated) {
            fetchProducts()
        }


    }, [isAuthenticated, router, openModal])

    if (!isAuthenticated) return null

    const onDelete = async (id: string) => {
        setProducts(prev => prev.filter(product => product._id !== id))
        await deleteProduct(id)
    }

    const handleProductUpdated = (updatedProduct: Product) => {
        setProducts(prev =>
            prev.map(p =>
                p._id === updatedProduct._id ? updatedProduct : p
            )
        )
    }


    return (
        <>
            <section className='flex w-full h-full  '>
                <div className='p-5 flex flex-wrap gap-20 w-full flex-col'>
                    <div className='flex justify-end'>
                        <button className="bg-blue-500 text-white p-2 w-35 rounded-md hover:bg-blue-600 cursor-pointer"
                            onClick={() => setOpenModal(true)}>Crear producto</button>
                    </div>
                    <div className='flex gap-10 flex-wrap'>
                        {products && products.map(product => (
                            <div key={product._id}>
                                <ProductCard
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    description={product.description}
                                    onDelete={() => onDelete(product._id)}
                                    editIdProduct={product._id}
                                    onProductUpdated={handleProductUpdated}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <CreateProductModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    )
}

export default Dashboard
