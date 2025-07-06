// apiClient.ts
import axios from 'axios';

let isRefreshing = false;
let failedQueue: { resolve: (value: any) => void; reject: (reason?: any) => void }[] = [];

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
    withCredentials: true,
    timeout: 10000,
});

const processQueue = (error: any | null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(true); // Resolve with true if refresh was successful, allows retrying original request
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Condition for token refresh:
        // 1. Response status is 401 (Unauthorized)
        // 2. Not already attempting to login or refresh (to avoid infinite loops)
        // 3. Not already marked as retried (originalRequest._retry)
        if (error.response?.status === 401 &&
            originalRequest.url !== '/api/auth/login' &&
            originalRequest.url !== '/api/auth/refresh' &&
            !originalRequest._retry) {

            originalRequest._retry = true; // Mark this request as retried to prevent looping

            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject }); // Add the current request to a queue

                if (!isRefreshing) {
                    isRefreshing = true; // Set flag to prevent multiple refresh calls

                    apiClient.post('/api/auth/refresh')
                        .then(res => {
                            // !!! IMPORTANT CHANGE HERE: Check res.data.success explicitly
                            if (res.data.success) {
                                console.log('Token refreshed successfully:', res.data);
                                isRefreshing = false;
                                processQueue(null); // Process queued requests, indicating success
                                resolve(apiClient(originalRequest)); // Retry the original failed request
                            } else {
                                // If backend reports refresh failed (e.g., old refresh token, logout needed)
                                console.error('Refresh token failed (backend reported failure):', res.data.message || 'Unknown refresh error');
                                isRefreshing = false;
                                processQueue(new Error(res.data.message || 'Refresh token failed')); // Reject queued requests
                                reject(new Error(res.data.message || 'Refresh token failed')); // Reject original request
                                // Optionally, redirect to login page here if refresh truly failed
                                // if (typeof window !== 'undefined') {
                                //     window.location.href = '/login';
                                // }
                            }
                        })
                        .catch(refreshError => {
                            // Network error or actual server error during refresh call
                            console.error('Network or server error during refresh token call:', refreshError.response?.data || refreshError.message);
                            isRefreshing = false;
                            processQueue(refreshError); // Reject queued requests
                            reject(refreshError); // Reject original request
                            // Optionally, redirect to login page here
                            // if (typeof window !== 'undefined') {
                            //     window.location.href = '/login';
                            // }
                        });
                }
            });
        }

        return Promise.reject(error); // For any other error, just reject
    }
);

export default apiClient;