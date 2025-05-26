
import React, { ReactNode } from 'react';
import { SidebarProvider } from '../../components/ui/sidebar';
import MainSidebar from './MainSidebar';
import BreadcrumbNavigation from './BreadcrumbNavigation';
import PageTransition from './PageTransition';
import { Toaster } from "../../components/ui/toaster";

interface ModernDashboardLayoutProps {
  children: ReactNode;
}

const ModernDashboardLayout: React.FC<ModernDashboardLayoutProps> = React.memo(({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <MainSidebar />
        
        <div className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <div className="container mx-auto">
            <BreadcrumbNavigation />
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </div>
      </div>
      
      <Toaster />
    </SidebarProvider>
  );
});

ModernDashboardLayout.displayName = 'ModernDashboardLayout';

export default ModernDashboardLayout;
