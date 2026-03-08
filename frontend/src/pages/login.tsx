import React from 'react'
import LoginForm from '@/components/pages/login/login-form'
import useDocumentTitle from '@/hooks/useDocumentTitle'

const Login = () => {
    useDocumentTitle('Login')
    return (
        <div className="min-h-screen flex items-center justify-center">
            <LoginForm />
        </div>
    )
}

export default Login