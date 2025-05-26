
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import AppointmentCard, { AppointmentProps } from './AppointmentCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CalendarClock } from 'lucide-react';

interface UpcomingAppointmentsProps {
  appointments: AppointmentProps[];
  title: string;
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({
  appointments,
  title
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <Card className="shadow-md border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl overflow-hidden h-full">
      <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-700">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
          <CalendarClock className="h-5 w-5 text-primary dark:text-primary-300 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {appointments.length > 0 ? (
          <ScrollArea className="h-[400px] pr-4">
            <motion.div 
              className="space-y-3"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {appointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <AppointmentCard
                    {...appointment}
                  />
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        ) : (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-center py-8 text-gray-500 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-700"
          >
            <CalendarClock className="h-10 w-10 text-gray-400 dark:text-gray-500 mx-auto mb-2 opacity-50" />
            <p className="text-base mb-1">Nenhum agendamento</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Os próximos agendamentos aparecerão aqui
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
