import Cookies from "js-cookie";
import axiosInstance from "@/lib/axiosInstance";

export const login = async (username: string, password: string): Promise<boolean> => {
    try {
        const response = await axiosInstance.post("/token", { username, password });

        const { access, refresh, user } = response.data;
        Cookies.set("access_token", access, { path: "/", expires: 1 / 1440 });
        Cookies.set("refresh_token", refresh, { path: "/", expires: 5 / 1440 });
        Cookies.set("user_details", JSON.stringify(user), { path: "/", secure: true, sameSite: "strict", expires: 1 / 1440 });

        return true;
    } catch (error) {
        console.error("Failed to login:", error);
        return false;
    }
};

export const logout = async (): Promise<boolean> => {
    try {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("user_details");

        window.location.href = "/login";
        
        return true;
    } catch (error) {
        console.error("Failed to logout:", error);
        return false;
    }
};

export const reauthenticate = async (): Promise<boolean> => {
    try {
        const refreshToken = Cookies.get("refresh_token");
        if (!refreshToken) {
            return false;
        }

        const response = await axiosInstance.post("/token/refresh", { refresh: refreshToken });
        const { access, refresh } = response.data;
        Cookies.set("access_token", access, { path: "/", expires: 1 / 1440 });
        Cookies.set("refresh_token", refresh, { path: "/", expires: 5 / 1440 });

        return true;
    } catch (error) {
        console.error("Failed to reauthenticate:", error);
        return false;
    }
};