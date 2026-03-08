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
  SidebarMenuItem 
} from '@/components/ui/sidebar'
import { Folder, LayoutDashboard, LogOut, User, type LucideIcon } from 'lucide-react';


const AppSidebar = () => {
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


  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <a href='#'>
                Laravel + React
              </a>
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
                    <a href={link.url} className='flex items-center gap-2 cursor-pointer'>
                      {link.icon && <link.icon />}
                      <span>{link.title}</span>
                    </a>
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
            <SidebarMenuButton className='cursor-pointer'>
              <a href='#' className='flex items-center gap-2'>
                <LogOut />
                <span>Logout</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar