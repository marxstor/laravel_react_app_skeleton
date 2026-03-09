import React from 'react'
import Text from '@/components/ui/text';
import { useAuth } from '@/context/auth-context';

const DashboardView = () => {
  const { user } = useAuth();
  return (
    <>
      <Text>
        Welcome to Laravel + React Skeleton <span className='font-medium'>{user?.name}</span>
      </Text>
    </>
  )
}

export default DashboardView