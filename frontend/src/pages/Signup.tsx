import RegistrationForm from '@/components/pages/Login/RegistrationForm'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import React from 'react'

const Signup = () => {
	useDocumentTitle('Create an Account')
  return (
		<div className="min-h-screen flex items-center justify-center">
			<RegistrationForm />
		</div>
  )
}

export default Signup