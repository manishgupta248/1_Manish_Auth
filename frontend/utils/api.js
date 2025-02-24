import axios from 'axios';
import Cookie from 'js-cookie';

const API_URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

let isLoggingOut = false; // Flag to prevent logout loops

axiosInstance.interceptors.request.use(async (config) => {
    const accessToken = Cookie.get('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry && !isLoggingOut) {
        originalRequest._retry = true;
        try {
            const response = await axios.post(`${API_URL}/auth/jwt/refresh/`, {
                refresh: Cookie.get('refreshToken'),
            });
            const { access } = response.data;
            Cookie.set('accessToken', access, { expires: 1, sameSite: 'strict', secure: true });
            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
            return axiosInstance(originalRequest);
        } catch (err) {
            logoutUser();
            return Promise.reject({ message: "Refresh token failed, please login again.", error: err });
        }
    }
    return Promise.reject(error);
});

export const registerUser = async (userData) => {
    const response = await axiosInstance.post(`/auth/users/`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axiosInstance.post(`/auth/jwt/create/`, userData);
    const { access, refresh } = response.data;
    Cookie.set('accessToken', access, { expires: 1, sameSite: 'strict', secure: true });
    Cookie.set('refreshToken', refresh, { expires: 7, sameSite: 'strict', secure: true });
    return response.data;
};

export const getUser = async () => {
    const response = await axiosInstance.get(`/auth/users/me/`);
    return response.data;
};

export const updateUser = async (userData) => {
    const response = await axiosInstance.put(`/auth/users/me/`, userData);
    return response.data;
};

export const logoutUser = async () => {
    isLoggingOut = true; // Set the flag to prevent loops
    try {
        const refreshToken = Cookie.get('refreshToken');
        if (refreshToken) {
            await axiosInstance.post(`/auth/logout/`, { refresh_token: refreshToken });
        }
        Cookie.remove('accessToken');
        Cookie.remove('refreshToken');
    } catch (error) {
        console.error('Logout failed:', error);
    } finally {
        isLoggingOut = false; // Reset the flag
    }
};

export const changePassword = async (passwordData) => {
    const response = await axiosInstance.post(`/auth/users/set_password/`, passwordData);
    return response.data;
};