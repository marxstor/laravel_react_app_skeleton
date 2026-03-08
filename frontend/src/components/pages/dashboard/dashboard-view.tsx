import React from 'react'
import AppSidebar from '@/components/partials/app-sidebar';
import Text from '@/components/ui/text';


const DashboardView = () => {
  return (
    <>
      <AppSidebar />
      <main className='px-4 py-2'>
        <Text>
          Hello from Laravel + React Skeleton
        </Text>
      </main>
    </>
  )
}

export default DashboardView