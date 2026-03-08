import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from '@/pages/login'
import Signup from '@/pages/signup'
import Dashboard from '@/pages/dashboard'
import AppLayout from '@/layouts/app-layout'
import { AuthProvider, useAuth } from '@/context/auth-context'

const ProtectedRoute = () => {
    const { user, loading } = useAuth()

    if (loading) return <div>Loading...</div>

    return user ? <Outlet /> : <Navigate to="/login" replace />
}

const GuestRoute = () => {
    const { user, loading } = useAuth()

    if (loading) return <div>Loading...</div>

    return !user ? <Outlet /> : <Navigate to="/dashboard" replace />
}


const AppRouter = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<GuestRoute />}>
                        <Route path='/' element = {<Login />} />
                        <Route path='/login' element = {<Login />} />
                        <Route path='/register' element = {<Signup />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route element={<AppLayout />}>
                            <Route path='/dashboard' element = {<Dashboard />} />
                        </Route>    
                    </Route>

                    <Route path='*' element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default AppRouter