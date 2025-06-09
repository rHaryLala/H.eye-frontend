"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"
import AuthService from "@/lib/auth-service"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const defaultUser = {
  name: "Hary Lala Rabenaman",
  email: "rabenamanahary@gmail.com",
  avatar: "https://ui-avatars.com/api/?name=Utilisateur&background=random",
};

const data = {
  user: defaultUser,
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Attendance",
      url: "/attendance",
      icon: IconListDetails,
    },
    {
      title: "Surveillance",
      url: "/camera",
      icon: IconChartBar,
    },
    {
      title: "Presence",
      url: "/presence",
      icon: IconReport,
    },
    {
      title: "Geolocation",
      url: "/geolocation",
      icon: IconSearch,
    },
    {
      title: "History",
      url: "/history",
      icon: IconFolder,
    },
    {
      title: "Person",
      url: "/user",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "/library",
      icon: IconDatabase,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userData, setUserData] = useState(defaultUser);
  const [refreshCounter, setRefreshCounter] = useState(0);
  
  // Fonction pour forcer le rafraîchissement des données utilisateur
  const refreshUserData = () => {
    setRefreshCounter(prev => prev + 1);
  };

  // Effet pour écouter les changements de stockage (login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      refreshUserData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Vérifier toutes les 2 secondes si le token a changé
    const intervalId = setInterval(() => {
      const isAuthenticated = !!localStorage.getItem('accessToken');
      if (isAuthenticated) {
        refreshUserData();
      }
    }, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  // Effet pour récupérer les informations utilisateur
  useEffect(() => {
    // Récupérer les informations de l'utilisateur à partir du token JWT
    console.log('AppSidebar useEffect - Récupération des informations utilisateur');
    const userInfo = AuthService.getUserInfo();
    console.log('AppSidebar useEffect - userInfo récupéré:', userInfo);
    
    if (userInfo) {
      const username = userInfo.name || userInfo.username;
      const newUserData = {
        name: username || 'Hary Lala Rabenamana', 
        email: userInfo.email || 'rabenamanahary@gmail.com',
        avatar: userInfo.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(username || 'Utilisateur')}&background=random`,
      };
      console.log('AppSidebar useEffect - Mise à jour userData avec:', newUserData);
      setUserData(newUserData);
    }
  }, [refreshCounter]);
  
  console.log('AppSidebar render - userData actuel:', userData);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">H. eye</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
