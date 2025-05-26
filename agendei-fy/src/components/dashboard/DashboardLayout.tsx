
import React, { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import LogoutButton from '../../components/LogoutButton';
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { useAuth } from '../../contexts/auth';
import { motion } from 'framer-motion';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";
import { Settings, User, Calendar, Bell } from 'lucide-react';
import { Toaster } from "../../components/ui/toaster";

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  activeTab,
  onTabChange 
}) => {
  const { profile } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 shadow-sm backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary transition-all duration-300 hover:scale-105">Agendeify</h1>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center">
              <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-primary dark:hover:text-primary-300 transition-colors" />
            </div>
            
            <ThemeSwitcher className="hidden sm:flex" />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer group">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Avatar className="h-9 w-9 transition-all duration-300 border-2 border-transparent group-hover:border-primary/20">
                      <AvatarImage src="https://i.pravatar.cc/150?img=12" alt={profile?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">{profile?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <span className="font-medium hidden md:inline-block dark:text-white">{profile?.name}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{profile?.name}</p>
                    <p className="text-xs leading-none text-gray-500 dark:text-gray-400">{profile?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Agendamentos</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <LogoutButton className="w-full justify-center" />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Test Period Alert */}
      <div className="bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800 transition-colors duration-300">
        <div className="container mx-auto px-4 py-2 text-center text-amber-800 dark:text-amber-200">
          <p className="text-sm font-medium">Seu período de teste grátis termina em 7 dias. Após isso, o uso da plataforma será R$39,99/mês.</p>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="mb-6 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-1 shadow-sm w-full sm:w-auto">
            {['day', 'week', 'month'].map((tab) => (
              <TabsTrigger 
                key={tab} 
                value={tab} 
                className={`transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 relative ${
                  activeTab === tab ? 'text-primary font-medium' : ''
                } flex-1 sm:flex-none`}
              >
                <span>{tab === 'day' ? 'Dia' : tab === 'week' ? 'Semana' : 'Mês'}</span>
                {activeTab === tab && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeTabIndicator"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Tab content */}
          <div className="mt-4">
            {children}
          </div>
        </Tabs>
      </div>
      
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
