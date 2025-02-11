import axios from "axios";
import Cookies from "js-cookie";
import { logout } from "./services/authService";
import { redirect } from "next/navigation";

const axiosInstance = axios.create({
    baseURL: "/api", // Use hidden API URL for requests to backend
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
    // Get access token from cookies
    const token = Cookies.get("access_token");

    // Set headers with Bearer token if available
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
},
    (error) => {
        return Promise.reject(new Error(error));
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use((response) => 
    response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 500 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken  = Cookies.get("refresh_token");
            
                if (!refreshToken) {
                    await logout(); // ✅ If refresh token is not available, log out the user
                    return Promise.reject(new Error("refresh-token-not-found"));
                }
                
                // Get new access token using refresh token
                const { data } = await axiosInstance.post("/token/refresh", { refresh: refreshToken });

                // Update access token in cookies
                Cookies.set("access_token", data.access, { path: "/", expires: 1 / 1440 });

                // Retry the original request
                originalRequest.headers.Authorization = `Bearer ${data.access}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                await logout(); // ✅ If refresh fails, log out the user
                return Promise.reject(new Error("refresh-token-failed"));
            };

        }
        return Promise.reject(new Error(error));
    }
);

export default axiosInstance;