"use client";

import { login } from "@/lib/services/authService";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const submitLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const status = await login(email, password);
        if (status) {
            router.push("/");
        }
    }

    return (
        <form onSubmit={submitLogin} className="mt-6 space-y-4">
            <input
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-200"
            >
                Log In
            </button>
        </form>
    )
}

export default LoginForm