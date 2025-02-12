"use client";

import { createContext, useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axiosInstance from "@/lib/axiosInstance";
import { setLogoutCallback } from "@/lib/authhandler";

interface AuthContextType {
    user: { username: string; email: string } | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    reauthenticate: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ username: string; email: string } | null>(null);
    const router = useRouter();
    
    const login = useCallback(async (username: string, password: string) => {
        try {
            const response = await axiosInstance.post("/token", { username, password });

            const { access, refresh, user } = response.data;

            Cookies.set("access_token", access, { path: "/", expires: 1 / 24 });
            Cookies.set("refresh_token", refresh, { path: "/", expires: 8 / 24 });
            setUser(user);

            router.push("/");
            return true;
        } catch (error) {
            console.error("Failed to login:", error);
            return false;
        }
    }, [router]);

    const logout = useCallback(async () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        setUser(null);

        router.push("/login");
    }, [router]);

    const reauthenticate = useCallback(async () => {
        try {
            const refreshToken = Cookies.get("refresh_token");
            if (!refreshToken) {
                return false;
            }

            const response = await axiosInstance.post("/token/refresh", { refresh: refreshToken });
            const { access, refresh } = response.data;

            Cookies.set("access_token", access, { path: "/", expires: 1 / 24 });
            Cookies.set("refresh_token", refresh, { path: "/", expires: 8 / 24 });

        } catch (error) {
            console.error("Failed to reauthenticate:", error);
            logout();
        }
    }, [logout]);

    useEffect(() => {
        setLogoutCallback(logout);
    }, [logout]);

    const value = useMemo(() => ({ user, login, logout, reauthenticate }), [user, login, logout, reauthenticate]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};