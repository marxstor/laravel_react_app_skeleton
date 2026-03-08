import AppSidebar from '@/components/partials/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'
import { Outlet } from 'react-router-dom';


const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='px-4 py-2'>
        <Outlet />
      </main>
    </SidebarProvider>
  )
} 

export default AppLayout;