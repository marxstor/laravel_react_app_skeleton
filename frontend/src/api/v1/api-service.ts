import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }    
});

// Request interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
);

// Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;       
    },
    (error: AxiosError) => {
        const status = error.response?.status;

        switch(status) {
            case 401: 
                localStorage.removeItem('token');
                window.location.href = '/login';
                break;
            
            case 403: 
                window.location.href = '/unauthorized';
                break;
        
            case 404:
            case 422:
                break;
            
            case 500: 
                console.error('Server error. Please try again later.');
                break;
            
            default:
                console.error(`Unexpected error: ${status}`)

        }

        return Promise.reject(error);
    }
)

export default api;
