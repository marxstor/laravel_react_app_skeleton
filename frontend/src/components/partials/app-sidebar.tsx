import React from 'react'
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
} from '@/components/ui/sidebar'
import { Folder, LayoutDashboard, LogOut, User, type LucideIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/images/logo.png';
import { useAuth } from '@/context/auth-context';
import authApi from '@/api/v1/auth-api';


const AppSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const data:{ 
    links: {
      title: string;
      url: string;
      icon: LucideIcon;
    }[]
  } = {
    links: [
      {
        title: "Dashboard",
        url: "#",
        icon: LayoutDashboard
      },
      {
        title: "Users",
        url: "#",
        icon: User
      },
      {
        title: "Files",
        url: "#",
        icon: Folder
      },
    ]
  };

  const handleLogout = async () => {
  
    try {
      await authApi.logout();
    } catch (err) {
      
    } finally {
      localStorage.removeItem('token');
      logout();
      navigate('/login');
    }
  }


  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <img src = {logo} alt='Logo' className='h-8 w-8'/>
              <Link to='/dashboard' className = "font-medium">
                Laravel + React
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.links.map((link) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton className='cursor-pointer'>
                    <Link to={link.url} className='flex items-center gap-2 cursor-pointer'>
                      {link.icon && <link.icon />}
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className='cursor-pointer' onClick={handleLogout}>
                <LogOut />
                <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar 