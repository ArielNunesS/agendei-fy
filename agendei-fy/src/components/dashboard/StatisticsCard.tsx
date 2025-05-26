
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { UserIcon, CalendarIcon, ClockIcon } from 'lucide-react';

interface StatisticsProps {
  totalClients: number;
  hoursBooked: number;
  activeAppointments: number;
}

const StatisticsCard: React.FC<StatisticsProps> = ({
  totalClients,
  hoursBooked,
  activeAppointments,
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl">
      <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-700">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Estatísticas</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <div className="flex justify-between">
          <motion.div 
            className="text-center p-2"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner border border-blue-100 dark:border-blue-800"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <UserIcon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <motion.span 
              className="block text-lg font-bold text-blue-700 dark:text-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {totalClients}
            </motion.span>
            <p className="text-xs text-gray-600 dark:text-gray-400">Clientes</p>
          </motion.div>
          
          <motion.div 
            className="text-center p-2"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner border border-green-100 dark:border-green-800"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ClockIcon className="h-7 w-7 text-green-600 dark:text-green-400" />
            </motion.div>
            <motion.span 
              className="block text-lg font-bold text-green-700 dark:text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {hoursBooked}
            </motion.span>
            <p className="text-xs text-gray-600 dark:text-gray-400">Horas</p>
          </motion.div>
          
          <motion.div 
            className="text-center p-2"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner border border-amber-100 dark:border-amber-800"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CalendarIcon className="h-7 w-7 text-amber-600 dark:text-amber-400" />
            </motion.div>
            <motion.span 
              className="block text-lg font-bold text-amber-700 dark:text-amber-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {activeAppointments}
            </motion.span>
            <p className="text-xs text-gray-600 dark:text-gray-400">Ativos</p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
