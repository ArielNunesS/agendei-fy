
import React from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface TrialPeriodAlertProps {
  daysRemaining: number;
  totalTrialDays?: number;
}

const TrialPeriodAlert: React.FC<TrialPeriodAlertProps> = ({ 
  daysRemaining, 
  totalTrialDays = 7 
}) => {
  // Calculate percentage remaining
  const percentRemaining = Math.min(Math.max((daysRemaining / totalTrialDays) * 100, 0), 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg mb-6 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-sm"
    >
      <div className="flex items-center gap-3 mb-3 sm:mb-0">
        <div className="bg-amber-100 dark:bg-amber-800/50 p-2 rounded-full">
          <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            Seu período de teste grátis termina em {Math.round(daysRemaining)} dias.
          </p>
          <div className="mt-2 w-full sm:w-64">
            <div className="flex justify-between text-xs text-amber-700 dark:text-amber-400 mb-1">
              <span>Dias restantes</span>
              <span>{Math.round(daysRemaining)}/{totalTrialDays}</span>
            </div>
            <Progress value={percentRemaining} className="h-2 bg-amber-100 dark:bg-amber-800/50" />
          </div>
        </div>
      </div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          variant="default" 
          size="sm" 
          className="bg-amber-500 hover:bg-amber-600 text-white w-full sm:w-auto transition-all border-0"
        >
          Assinar agora
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default TrialPeriodAlert;
