import axios from "axios";
// Otherwise, we will use window.location

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

// Request Interceptor - Attach Access Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor - Handle Expired Token
api.interceptors.response.use(
    (response) => response, // just pass through if everything is okay
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 Unauthorized and we haven't retried yet
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                if (refreshToken) {
                    const refreshResponse = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
                        refresh: refreshToken,
                    });

                    const newAccessToken = refreshResponse.data.access;
                    // Save the new access token
                    localStorage.setItem("accessToken", newAccessToken);

                    // Update the Authorization header and retry original request
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return api(originalRequest);
                } else {
                    throw new Error("No refresh token available");
                }
            } catch (refreshError) {
                console.error("Token refresh failed: ", refreshError);
                // Clear storage and redirect to login
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                window.location.href = "/login"; // redirect
                return Promise.reject(refreshError);
            }
        }

        // Any other error
        return Promise.reject(error);
    }
);

export default api;
