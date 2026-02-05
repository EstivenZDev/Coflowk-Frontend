"use client"

import { login } from "@/services/user/user";
import useAuthStore from "@/store/useAuthStore";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


export default function Home() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loanding, setLoanding] = useState(false)
    const setUser = useAuthStore((state) => state.setUser)
    const router = useRouter()

    const { isAuthenticated, hasHydrated } = useAuthStore();


    useEffect(() => {
        if (hasHydrated && isAuthenticated) {
            router.replace("/dashboard");
        }
    }, [hasHydrated, isAuthenticated, router]);

    if (!hasHydrated) return null; // o loader


    const handleSubmit = async (e) => {
        setLoanding(true)
        e.preventDefault()

        if (!email || !password) {
            Swal.fire({ title: "Completa todos los campos", icon: "error", confirmButtonColor: "#3B82F6" })
            setLoanding(false)
            return

        }

        try {
            const data = await login(email, password)

            if (data.status === 200) {
                Swal.fire({ title: "Inicio de sesión exitoso", icon: "success", confirmButtonColor: "#3B82F6" })

                setUser(data.data.data)

                router.replace("/dashboard")

            }

        } catch (error) {
            const err = error as AxiosError<{ message: string }>

            Swal.fire({
                title: err.response?.data?.message || "Error iniciando sesión",
                icon: "error",
                confirmButtonColor: "#3B82F6"
            })
        } finally {

            setLoanding(false)
        }

    }



    return (
        <>
            <section className="w-screen h-screen flex justify-center items-center">
                <form onSubmit={handleSubmit} className="flex flex-col gap-10 shadow-xl rounded-xl p-10 h-100 items-center justify-center">
                    <div>
                        <h1 className="text-2xl font-bold">Inicio de sesión</h1>
                    </div>
                    <div className="flex flex-col gap-10">
                        <div>
                            <input
                                type="email"
                                placeholder="Correo"
                                className="bg-gray-100 p-2 rounded-md w-75 focus:outline-none"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="bg-gray-100 p-2 rounded-md w-75 focus:outline-none"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className=" flex justify-center">
                            <button className="bg-blue-500 text-white p-2 w-25 rounded-md hover:bg-blue-600 cursor-pointer">
                                {loanding ? <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : "Enviar"}
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
}
