import api from "./api-service";

export interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password:string;
}

export interface AuthResponse {
    success: boolean;
    token: string;
    user: User;
}

export interface MessageResponse {
    message: string;
}

const authApi = {
    login: (payload: LoginPayload) => 
        api.post<AuthResponse>('/auth/login', payload),
    
    register: (payload: RegisterPayload) => 
        api.post<AuthResponse>('/auth/register', payload),
    
    logout: () => 
        api.post<MessageResponse>('/auth/logout'),

}

export default authApi;

