import { formatPrice } from "@/utils/formatPrice";
import { Pencil, Trash2 } from 'lucide-react'; // Cambié Trash por Trash2 que suele verse más moderno
import EditProductModal from "../EditProductModal/EditProductModa";
import { useState } from "react";
import { Product } from "@/types/product";

type ProductCardProps = {
    image?: string;
    name: string;
    price: number;
    description: string;
    editIdProduct: string
    onDelete?: () => void;
    onProductUpdated: (product: Product) => void
};

export default function ProductCard({
    image,
    name,
    price,
    description,
    editIdProduct,
    onDelete,
    onProductUpdated
}: ProductCardProps) {

    const [isOpen, setIsOpen] = useState(false)


    return (
        <>
        <div
            className="group w-64 h-[22rem] bg-white rounded-2xl shadow-sm cursor-pointer overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl active:scale-95 flex flex-col border border-gray-100"
        >
            {/* Contenedor de Imagen */}
            <div className="relative h-44 w-full overflow-hidden bg-gray-50">
                <img
                    src={
                        image || "https://static.vecteezy.com/system/resources/previews/007/126/739/non_2x/question-mark-icon-free-vector.jpg"
                    }
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Badge de Precio Flotante */}
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
                    <p className="text-sm font-bold text-blue-600">
                        {price}
                    </p>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 truncate mb-1">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Acciones */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-50">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
                        className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-colors duration-200"
                        title="Eliminar"
                    >
                        <Trash2 size={18} />
                    </button>
                    
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsOpen(true)}}
                        className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-colors duration-200"
                        title="Editar"
                    >
                        <Pencil size={18} />
                    </button>
                </div>
            </div>
        </div>
        <EditProductModal id={editIdProduct} isOpen={isOpen} onClose={()=>{setIsOpen(false)}} onUpdated={onProductUpdated}/>
        </>
    );
}