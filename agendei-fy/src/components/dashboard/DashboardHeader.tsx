
import React from 'react';
import { Button } from '../../components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  activeTab: 'day' | 'week' | 'month';
  isCreatingAppointment: boolean;
  handleCreateAppointment: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeTab,
  isCreatingAppointment,
  handleCreateAppointment
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <motion.h2 
        className="text-2xl font-bold text-gray-900 dark:text-gray-100"
        key={activeTab}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'day' ? 'Agenda Diária' :
         activeTab === 'week' ? 'Agenda Semanal' : 'Agenda Mensal'}
      </motion.h2>
      <Button 
        className="flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 bg-primary hover:bg-primary-700 shadow-sm w-full md:w-auto"
        onClick={handleCreateAppointment}
        disabled={isCreatingAppointment}
      >
        {isCreatingAppointment ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
        <span className="whitespace-nowrap">
          {isCreatingAppointment ? 'Processando...' : 'Criar Horário'}
        </span>
      </Button>
    </div>
  );
};

export default DashboardHeader;
