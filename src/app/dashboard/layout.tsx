"use client"

import { logout } from "@/services/user/user";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    const { isAuthenticated, hasHydrated, logOut } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (hasHydrated && !isAuthenticated) {
            router.replace("/");
        }
    }, [hasHydrated, isAuthenticated, router]);

    if (!hasHydrated) return null; // o loader


    const handleLogout = async () => {
        await logout()
        logOut()
    }



    return (
        <div className="flex h-screen overflow-hidden ">
            {/* Sidebar */}
            <aside className="w-70 text-black p-4 shadow-xl flex flex-col justify-between">
                <h2 className="text-xl font-bold mb-6">Mi Dashboard</h2>

                <nav className="space-y-3">
                    <Link href="/dashboard" className="block hover:text-blue-400">
                        Inicio
                    </Link>
                    <Link href="/dashboard/orders" className="block hover:text-blue-400">
                        Pedidos
                    </Link>
                    <Link href="/dashboard/products" className="block hover:text-blue-400">
                        Productos
                    </Link>
                    <Link href="/dashboard/products" className="block hover:text-blue-400">
                        Usuarios
                    </Link>
                </nav>

                <div>
                    <button className="bg-blue-500 text-white p-2 w-25 rounded-md hover:bg-blue-600 cursor-pointer" onClick={handleLogout}>Cerrar sesion</button>
                </div>
            </aside>

            {/* Contenido */}
            <main className="flex-1 bg-gray-100 p-6">
                {children}
            </main>
        </div>
    );
}
