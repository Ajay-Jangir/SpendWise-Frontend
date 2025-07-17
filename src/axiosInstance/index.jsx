import axios from 'axios';
import Swal from 'sweetalert2';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach JWT token if available
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('spendwise_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Global error handler (401: session expired only on protected routes)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error?.response?.status;
        const pathname = window.location.pathname;

        // Define public routes that shouldn't show "session expired"
        const publicRoutes = ["/login", "/register", "/forgot-password"];
        const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

        // Handle 401 only on protected routes
        if (status === 401 && !isPublicRoute) {
            if (!window.__SESSION_EXPIRED_SHOWN__) {
                window.__SESSION_EXPIRED_SHOWN__ = true;

                localStorage.removeItem('spendwise_token');

                await Swal.fire({
                    icon: 'warning',
                    title: 'Session Expired',
                    text: 'Your session has expired. Please log in again.',
                    confirmButtonText: 'OK',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });

                window.__SESSION_EXPIRED_SHOWN__ = false;

                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
