import React from 'react'
import Text from './text'

const FieldError = ({ message} : {message?: string}) => {
  return (
    <Text variant = "muted" className='text-red-600'>{message}</Text>
  )
}

export default FieldError