// frontend/utils/axiosAcademic.js
import axios from 'axios';
import Cookie from 'js-cookie';
// Base Axios instance with JWT token from httpOnly cookies
const axiosAcademic = axios.create({
    baseURL: 'http://127.0.0.1:8000/api' + '/academic/',
    withCredentials: true,  // Ensure cookies are sent with requests
});
// Request Interceptor: Add Authorization header
axiosAcademic.interceptors.request.use((config) => {
    const accessToken = Cookie.get('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor: Handle 401 and Refresh Token
axiosAcademic.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = Cookie.get('refreshToken');
                if (refreshToken) {
                    const response = await axios.post(`${API_URL}/auth/jwt/refresh/`, {
                        refresh: refreshToken,
                    });

                    const { access } = response.data;
                    Cookie.set('accessToken', access, { expires: 1, sameSite: 'strict', secure: true });
                    originalRequest.headers.Authorization = `Bearer ${access}`;
                    return axiosAcademic(originalRequest);
                }
            } catch (err) {
                console.error('Token refresh failed, please login again.');
            }
        }
        return Promise.reject(error);
    }
);

// Fetch all departments
export const getDepartments = async () => {
    const response = await axiosAcademic.get('departments/');
    return response.data;
};

// Fetch faculty choices
export const getFacultyChoices = async () => {
    const response = await axiosAcademic.get('faculty-choices/');
    return response.data;
};

// Create a new department
export const createDepartment = async (department) => {
    const response = await axiosAcademic.post('departments/', department);
    return response.data;
};

// Update a department
export const updateDepartment = async (id, department) => {
    const response = await axiosAcademic.put(`departments/${id}/`, department);
    return response.data;
};

// Delete a department
export const deleteDepartment = async (id) => {
    const response = await axiosAcademic.delete(`departments/${id}/`);
    return response.data;
};
