import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Text from '@/components/ui/text'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '@/api/v1/auth-api'
import { useAuth } from '@/context/auth-context'

interface UserCredentials {
	email: string;
	password: string;
}

const LoginForm = () => {
	const { login } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate()

	const [userCredentials, setUserCredentials ] = useState<UserCredentials>({
		email: '',
		password: ''
	});

	const handleUserCredentialsChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = ev.target;

		setUserCredentials(prev => ({
			...prev,
			[name]: value
		}));

	}

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			const { data } = await authApi.login(userCredentials);

			if(data.success) {
				localStorage.setItem('token', data.token);
				login(data.user);
				navigate('/dashboard');
			}

		} catch (err) {
			console.log('Something went wrong');
		} finally {
			setIsLoading(false);
		}
	}

  return (
    <Card className='w-full max-w-sm'>
        <CardHeader>
            <CardTitle className='text-lg font-bold'>Login</CardTitle>
            <CardDescription>
                Enter your email below to login to your account 
            </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
                <Label htmlFor = "email">Email</Label>
                <Input 
									type = 'email' 
									placeholder = 'john@example.com'
									name = 'email'
									onChange={handleUserCredentialsChange}
									disabled={isLoading}
								/>
            </div>
            <div className='grid gap-2'>
                <Label htmlFor = "password">Password</Label>
                <Input 
									type = 'password' 
									placeholder='**********'
									name = "password"
									onChange={handleUserCredentialsChange}
									disabled={isLoading}
								/>
            </div>
        </CardContent>
        <CardFooter className='bg-white'>
						<div className='w-full text-center space-y-2'>
							<Button className='w-full' onClick={handleSubmit} disabled={isLoading}>
								{isLoading ? 'Signing in...' : 'Sign in'}
							</Button>
							<Text variant='muted'>Don't have an account? <Link to = "/register" className='text-blue-600 font-medium hover:underline'>Sign up</Link></Text>
						</div>
        </CardFooter>
    </Card>
  )
}

export default LoginForm