
import React from 'react';
import { Button } from '../../components/ui/button';
import { Loader2, Plus, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModernDashboardHeaderProps {
  isCreatingAppointment: boolean;
  handleCreateAppointment: () => void;
  daysRemaining: number;
}

const ModernDashboardHeader: React.FC<ModernDashboardHeaderProps> = ({
  isCreatingAppointment,
  handleCreateAppointment,
  daysRemaining
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.h1 
          className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Dashboard
        </motion.h1>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            size="icon"
            className="rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Button 
            className="flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 bg-primary hover:bg-primary/90 shadow-sm"
            onClick={handleCreateAppointment}
            disabled={isCreatingAppointment}
          >
            {isCreatingAppointment ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            <span className="whitespace-nowrap">
              {isCreatingAppointment ? 'Processando...' : 'Novo Agendamento'}
            </span>
          </Button>
        </div>
      </div>
      
      {daysRemaining > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
        >
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <span className="font-medium">Período de teste:</span> Restam {Math.ceil(daysRemaining)} dias. Após isso, o uso da plataforma será R$39,99/mês.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ModernDashboardHeader;
