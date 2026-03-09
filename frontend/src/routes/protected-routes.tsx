import { useAuth } from "@/context/auth-context"
import type React from "react";
import { Navigate } from "react-router-dom";

type RouteProps = {
    children: React.ReactNode;
}
export const ProtectedRoute = ({ children }: RouteProps) => {
    const { user } =  useAuth();

    return user ? children : <Navigate to='/login'/>
}

export const GuestRoute = ({ children }: RouteProps) => {
    const { user } =  useAuth();

    return !user ? children : <Navigate to='/dashboard'/>
};