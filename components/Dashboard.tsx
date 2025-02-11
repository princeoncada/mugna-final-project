"use client";

import { logout } from "@/lib/services/authService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Dashboard = () => {
    const [user, setUser] = useState<{ username: string; email: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const userDetails = Cookies.get("user_details");
        if (userDetails) {
            setUser(JSON.parse(userDetails));
        }
    }, [router]);

    return (
        <>
            <h1 className="text-2xl font-bold text-center">Welcome, {user?.username ?? "Guest"} 👋</h1>
            <p className="text-gray-600 text-center mt-2">
                {user?.email !== "" ? `You are logged in as ${user?.email}` : ""}
            </p>

            <div className="mt-6 flex flex-col space-y-4">
                <button
                    onClick={() => router.push("/todos")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-200"
                >
                    Go to Your Todos
                </button>
                <button
                    onClick={() => logout()}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-md transition duration-200"
                >
                    Logout
                </button>
            </div>
        </>
    )
}

export default Dashboard