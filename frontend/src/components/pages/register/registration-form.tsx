import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Text from '@/components/ui/text'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '@/api/v1/auth-api'
import { useAuth } from '@/context/auth-context'
import axios from 'axios'
import FieldError from '@/components/ui/field-error'


interface UserDetails {
	name: string;
	email: string;
	password: string;
}

const RegistrationForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
		const [userDetails, setUserDetails ] = useState<UserDetails>({
			name: '',
			email: '',
			password: ''
		});
		const [error, setError] = useState<string | null>(null);
		const [fieldErrors, setFieldErrors] = useState<Partial<UserDetails>>({});

	const handleUserDetailsChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = ev.target;

		setUserDetails(prev => ({
			...prev,
			[name]: value
		}));

	}

    const handleSubmit = async () => {
        setIsLoading(true);
				setError(null);
				setFieldErrors({});
        try {
            const { data } = await authApi.register(userDetails);

            if(data.success) {
                localStorage.setItem('token', data.token);
                login(data.user);
                navigate('/dashboard');
            }

        } catch (err) {
            if(axios.isAxiosError(err)) {
				const status = err.response?.status;
				
				switch(status) {
					case 422: 
						const fieldErrors = err.response?.data?.errors;
						setFieldErrors({
							name: fieldErrors?.name,
							email: fieldErrors?.email,
							password: fieldErrors?.password
						});
						break;

					case 401:
						const errorMessage = err?.response?.data?.message;
						setError(errorMessage);
						break;

					default: 
						console.log('Unknown error status');
				}


			}
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <Card className='w-full max-w-sm'>
        <CardHeader>
            <CardTitle className='text-lg font-bold'>Create an account</CardTitle>
            <CardDescription>
                Enter your information to get started 
            </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
                <Label htmlFor = "name">Name</Label>
                <Input 
                    type = 'text' 
                    placeholder = 'Enter your name'
                    name = 'name'
										value = {userDetails?.name}
                    onChange={handleUserDetailsChange}
                    disabled={isLoading}
                />
								{fieldErrors?.name && <FieldError message={fieldErrors?.name}/>}
            </div>
            <div className='grid gap-2'>
                <Label htmlFor = "email">Email</Label>
                <Input 
                    type = 'email' 
                    placeholder = 'john@example.com'
                    name = 'email'
										value = {userDetails?.email}
                    onChange={handleUserDetailsChange}
                    disabled={isLoading}
                />
								{fieldErrors?.email && <FieldError message={fieldErrors?.email}/>}
            </div>
            <div className='grid gap-2'>
                <Label htmlFor = "password">Password</Label>
                <Input 
									type = 'password' 
									placeholder='**********'
									name = "password"
									value = {userDetails?.password}
									onChange={handleUserDetailsChange}
									disabled={isLoading}
								/>
								{fieldErrors?.password && <FieldError message={fieldErrors?.password}/>}
            </div>
						{error && <FieldError message={error}/>}
        </CardContent>
        <CardFooter className='bg-white'>
						<div className='w-full text-center space-y-2'>
							<Button className='w-full' onClick={handleSubmit} disabled={isLoading}>
									{isLoading ? 'Signing up' :'Sign up '}
							</Button>
							<Text variant='muted'>Already have an account? <Link to = "/login" className='text-blue-600 font-medium hover:underline'>Login</Link></Text>
						</div>
        </CardFooter>
    </Card>
  )
}

export default RegistrationForm