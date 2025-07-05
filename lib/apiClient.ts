import axios from 'axios';

let isRefreshing = false;
let failedQueue: { resolve: (value: any) => void; reject: (reason?: any) => void }[] = [];

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 10000,
});

const processQueue = (error: any | null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(true);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && originalRequest.url !== '/api/auth/login' && originalRequest.url !== '/api/auth/refresh' && !originalRequest._retry) {
            originalRequest._retry = true;

            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });

                if (!isRefreshing) {
                    isRefreshing = true;
                    apiClient.post('/api/auth/refresh')
                        .then(res => {
                            console.log('Token refreshed successfully:', res.data);
                            isRefreshing = false;
                            processQueue(null);
                            resolve(apiClient(originalRequest));
                        })
                        .catch(refreshError => {
                            console.error('Refresh token failed:', refreshError.response?.data || refreshError.message);
                            isRefreshing = false;
                            processQueue(refreshError);
                            reject(refreshError);
                        });
                }
            });
        }

        return Promise.reject(error);
    }
);

export default apiClient;
