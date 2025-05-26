
import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { 
  Calendar, Users, BookOpen, Briefcase, PieChart, Clock, 
  Settings, User, LogOut, ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import ThemeSwitcher from '@/components/ThemeSwitcher';

const MenuItem = ({ 
  to, 
  icon: Icon, 
  label, 
  isActive 
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string; 
  isActive: boolean 
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={label}>
        <Link to={to} className={cn(
          'flex items-center gap-3 w-full',
          isActive ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-400'
        )}>
          <Icon size={20} />
          <span>{label}</span>
          {isActive && (
            <motion.div 
              layoutId="activeIndicator" 
              className="absolute left-0 w-1 h-8 bg-primary rounded-r-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const MainSidebar = () => {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  
  const menuItems = [
    { to: '/dashboard', icon: Calendar, label: 'Agenda' },
    { to: '/clients', icon: Users, label: 'Clientes' },
    { to: '/services', icon: BookOpen, label: 'Serviços' },
    { to: '/professionals', icon: Briefcase, label: 'Profissionais' },
    { to: '/reports', icon: PieChart, label: 'Relatórios' },
    { to: '/schedule', icon: Clock, label: 'Horários' },
    { to: '/settings', icon: Settings, label: 'Configurações' },
  ];

  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-800">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-primary">Agendeify</h2>
          <div className="flex items-center gap-2">
            <ThemeSwitcher className="scale-75" />
            <SidebarTrigger />
          </div>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full mb-2 text-xs bg-background/50 dark:bg-background/20 flex items-center justify-center gap-2"
        >
          <a href="/portal-cliente" target="_blank" rel="noopener noreferrer">
            <span>Ver página pública</span>
            <ExternalLink size={14} />
          </a>
        </Button>
      </SidebarHeader>
      
      <SidebarContent>
        <div className="px-2">
          <SidebarMenu>
            {menuItems.map((item) => (
              <MenuItem 
                key={item.label}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to}
              />
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="mt-auto border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10 border-2 border-primary/10">
            <AvatarImage src="https://i.pravatar.cc/150?img=12" alt={profile?.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {profile?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium truncate">{profile?.name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{profile?.email}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
          onClick={signOut}
        >
          <LogOut size={16} />
          <span>Sair</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default MainSidebar;
