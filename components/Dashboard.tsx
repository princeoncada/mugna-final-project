"use client";

import { useRouter } from "next/navigation";
import AuthWrapper from "./AuthWrapper";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    return (
        <AuthWrapper>
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
        </AuthWrapper>
    )
}

export default Dashboard