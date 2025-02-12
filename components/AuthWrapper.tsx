"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { logout, reauthenticate } from "@/lib/services/authService";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    useEffect(() => {
        const accessToken = Cookies.get("access_token");
        const refreshToken = Cookies.get("refresh_token");

        if (!accessToken && refreshToken) {
            // Try refreshing the access token
            reauthenticate().then((success) => {
                if (!success) {
                    logout().then(() => {
                        router.push("/login");
                    });
                }
            });
        } else if (!accessToken && !refreshToken) {
            // No tokens at all, force logout
            logout().then(() => {
                router.push("/login");
            });
        }
    }, [router]); // Runs on every route change

    return <>{children}</>;
};

export default AuthWrapper;