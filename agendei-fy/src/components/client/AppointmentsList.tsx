
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, Clock, User, PlusCircle } from 'lucide-react';

interface Appointment {
  id: string;
  serviceName: string;
  providerName: string;
  time: string;
  clientName: string;
  service?: string;
  provider?: string;
}

interface AppointmentsListProps {
  appointments: Appointment[];
  onNewAppointment: () => void;
  onReschedule: (appointment: Appointment) => void;
  onCancelAppointment: (appointment: Appointment) => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ 
  appointments, 
  onNewAppointment, 
  onReschedule, 
  onCancelAppointment 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <motion.div key={appointment.id} variants={itemVariants}>
            <Card className="hover-lift glass-card dark:bg-gray-800/30 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-primary dark:text-primary-300">
                  {appointment.serviceName}
                </CardTitle>
                <CardDescription>
                  {appointment.providerName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary dark:text-primary-300" />
                  <span className="text-sm">
                    {appointment.time.split(' ')[0]}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary dark:text-primary-300" />
                  <span className="text-sm">
                    {appointment.time.split(' ')[1]}
                  </span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-primary dark:text-primary-300" />
                  <span className="text-sm">
                    {appointment.clientName}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex space-x-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onReschedule(appointment)}
                >
                  Reagendar
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => onCancelAppointment(appointment)}
                >
                  Cancelar
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-3">
          <Card className="glass-card dark:bg-gray-800/30 dark:border-gray-700 text-center p-8">
            <p className="text-gray-500 dark:text-gray-400">Você não possui agendamentos.</p>
            <Button 
              className="mt-4 bg-primary hover:bg-primary-600"
              onClick={onNewAppointment}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Novo Agendamento
            </Button>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AppointmentsList;
