import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '@/pages/login'
import Signup from '@/pages/signup'
import Dashboard from '@/pages/dashboard'
import AppLayout from '@/layouts/app-layout'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element = {<Login />} />
                <Route path='/login' element = {<Login />} />
                <Route path='/register' element = {<Signup />} />
                <Route element={<AppLayout />}>
                    <Route path='/dashboard' element = {<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter