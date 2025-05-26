
import React from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export interface AppointmentProps {
  id: string;
  serviceName: string;
  clientName: string;
  providerName: string;
  time: string;
  clientImage?: string;
  status?: 'confirmed' | 'pending' | 'canceled';
  // Adding the service and provider IDs needed for rescheduling functionality
  service?: string;
  provider?: string;
}

const AppointmentCard: React.FC<AppointmentProps> = ({
  clientName,
  serviceName,
  time,
  clientImage,
  status = 'confirmed',
}) => {
  // Status color and icon mapping with animation
  const getStatusConfig = (status: 'confirmed' | 'pending' | 'canceled') => {
    switch(status) {
      case 'confirmed':
        return {
          bgClass: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
          text: 'Confirmado',
          icon: CheckCircle
        };
      case 'pending':
        return {
          bgClass: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
          text: 'Pendente',
          icon: Clock
        };
      case 'canceled':
        return {
          bgClass: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
          text: 'Cancelado',
          icon: AlertTriangle
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="mb-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md rounded-lg overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.2 }}
          >
            <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-700 shadow-sm">
              <AvatarImage src={clientImage} alt={clientName} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">{clientName[0]}</AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="min-w-0">
            <h3 className="font-medium text-base text-gray-900 dark:text-gray-100 truncate">{clientName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{serviceName}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-medium text-sm text-gray-700 dark:text-gray-300">{time}</span>
          <motion.div 
            className={`text-xs px-2 py-1 rounded-full ${statusConfig.bgClass} flex items-center gap-1`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <StatusIcon size={12} />
            <span>{statusConfig.text}</span>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="p-3"></CardContent>
    </Card>
  );
};

export default AppointmentCard;
