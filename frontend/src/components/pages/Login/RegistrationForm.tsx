import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Text from '@/components/ui/text'
import { Link } from 'react-router-dom'
import authApi from '@/api/v1/auth-api'

interface UserDetails {
	name: string;
	email: string;
	password: string;
}

const RegistrationForm = () => {

	const [userDetails, setUserDetails ] = useState<UserDetails>({
		name: '',
		email: '',
		password: ''
	});

	const handleUserDetailsChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = ev.target;

		setUserDetails(prev => ({
			...prev,
			[name]: value
		}));

	}

	const handleSubmit = async () => {
		console.log(userDetails);
		try {
			const { data } = await authApi.register(userDetails);

			console.log(data);
		} catch (err) {
			console.log('Something went wrong');
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
                    onChange={handleUserDetailsChange}
                />
            </div>
            <div className='grid gap-2'>
                <Label htmlFor = "email">Email</Label>
                <Input 
                    type = 'email' 
                    placeholder = 'john@example.com'
                    name = 'email'
                    onChange={handleUserDetailsChange}
                />
            </div>
            <div className='grid gap-2'>
                <Label htmlFor = "password">Password</Label>
                <Input 
									type = 'password' 
									placeholder='**********'
									name = "password"
									onChange={handleUserDetailsChange}
								/>
            </div>
        </CardContent>
        <CardFooter className='bg-white'>
						<div className='w-full text-center space-y-2'>
							<Button className='w-full' onClick={handleSubmit}>Sign up</Button>
							<Text variant='muted'>Already have an account? <Link to = "/" className='text-blue-600 font-medium hover:underline'>Login</Link></Text>
						</div>
        </CardFooter>
    </Card>
  )
}

export default RegistrationForm