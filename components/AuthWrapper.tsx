"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/useAuth";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const { logout, reauthenticate } = useAuth();

    useEffect(() => {
        const accessToken = Cookies.get("access_token");
        const refreshToken = Cookies.get("refresh_token");

        if (!accessToken && refreshToken) {
            // Try refreshing the access token
            reauthenticate();
        } else if (!accessToken && !refreshToken) {
            // No tokens at all, force logout
            logout();
        }
    }, [reauthenticate, logout]); // Runs on every route change

    return <>{children}</>;
};

export default AuthWrapper;