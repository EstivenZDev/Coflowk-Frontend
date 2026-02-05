"use client";

import { createProduct, getProductById, updateProduct } from "@/services/products/products";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    id: string;
    onUpdated: (product: Product) => void
}

export default function EditProductModal({ isOpen, onClose, id, onUpdated }: EditProductModalProps) {

    const [loanding, setLoanding] = useState(false)
    const [product, setProduct] = useState<Product | null>(null)
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
    });

    useEffect(() => {
        if (!id) return

        const fetchProductById = async () => {
            const data = await getProductById(id)
            setProduct(data)

            setForm({
                name: data.name,
                price: data.price.toString(),
                description: data.description
            })


        }

        fetchProductById()
    }, [id])



    const [image, setImage] = useState<File | null>(null)

    if (!isOpen) return null;


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target as HTMLInputElement;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setImage(e.target.files[0])
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoanding(true)

        try {
            const formData = new FormData()
            formData.append("name", form.name)
            formData.append("description", form.description)
            formData.append("price", form.price)
            if (image) {
                formData.append("image", image)
            }



            const updatedProduct = await updateProduct(id, formData)

            onUpdated(updatedProduct)

            setLoanding(false)


        } catch (error) {
            console.log(error)

        } finally {
            setLoanding(false)
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl transition-all duration-300">
                <h2 className="mb-4 text-xl font-bold">Editar producto</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        placeholder="Nombre del producto"
                        className="w-full rounded shadow-md p-2 focus:outline-none"
                        required
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        name="price"
                        type="number"
                        placeholder="Precio"
                        className="w-full rounded shadow-md p-2 focus:outline-none"
                        required
                        value={form.price}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Descripcion"
                        className="w-full rounded shadow-md p-2 resize-none focus:outline-none"
                        required
                        value={form.description}

                        onChange={handleChange}
                    />

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Imagen</label>
                        <input
                            name="image"
                            placeholder="URL de la imagen"
                            className="w-full rounded shadow-md p-2 focus:outline-none"
                            onChange={handleImage}
                            type="file"
                        />
                    </div>



                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded px-4 py-2 text-gray-600 hover:bg-gray-100"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 flex justify-center items-center"
                        >
                            {loanding ? <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
