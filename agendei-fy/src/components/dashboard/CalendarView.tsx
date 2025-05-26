
import React from 'react';
import { Calendar } from '../../components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { AppointmentProps } from './AppointmentCard';
import { motion } from 'framer-motion';
import { Badge } from '../../components/ui/badge';
import { CalendarIcon } from 'lucide-react';
import dayjs from 'dayjs';

interface CalendarViewProps {
  view: 'day' | 'week' | 'month';
  selectedDate: Date;
  onDateChange: (date: Date | undefined) => void;
  appointments: AppointmentProps[];
}

const CalendarView: React.FC<CalendarViewProps> = ({
  view,
  selectedDate,
  onDateChange,
  appointments
}) => {
  // Identificar datas com agendamentos
  const appointmentDates = appointments.map(appointment => {
    // Em uma aplicação real, você converteria a string de data para objeto Date
    // Este é apenas um exemplo simples
    return new Date(appointment.time);
  });

  // Função para identificar se uma data tem agendamentos
  const dayClassNames = (date: Date): string => {
    const hasAppointment = appointmentDates.some(
      appDate => 
        appDate.getDate() === date.getDate() && 
        appDate.getMonth() === date.getMonth() && 
        appDate.getFullYear() === date.getFullYear()
    );
    
    return hasAppointment ? 'appointment-day' : '';
  };

  // Filtra agendamentos para a data selecionada
  const appointmentsForSelectedDate = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.time);
    return (
      appointmentDate.getDate() === selectedDate.getDate() && 
      appointmentDate.getMonth() === selectedDate.getMonth() && 
      appointmentDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="w-full transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
        <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
              <CalendarIcon className="h-5 w-5 text-primary dark:text-primary-300 mr-2" />
              Calendário
            </CardTitle>
            <Badge variant="outline" className="bg-primary/5 text-primary dark:bg-primary-900/20 dark:text-primary-300">
              {dayjs(selectedDate).format('MMMM YYYY')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <style>
            {`
            .appointment-day::after {
              content: '';
              position: absolute;
              bottom: 3px;
              left: 50%;
              transform: translateX(-50%);
              width: 6px;
              height: 6px;
              background-color: #4169E1;
              border-radius: 50%;
              animation: pulse 2s infinite;
            }
            
            .dark .appointment-day::after {
              background-color: #5a8dee;
            }
            
            @keyframes pulse {
              0% { opacity: 0.6; transform: translateX(-50%) scale(0.8); }
              50% { opacity: 1; transform: translateX(-50%) scale(1); }
              100% { opacity: 0.6; transform: translateX(-50%) scale(0.8); }
            }
            `}
          </style>
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div className="md:col-span-3">
              <Calendar 
                mode="single"
                selected={selectedDate}
                onSelect={onDateChange}
                className="rounded-lg border w-full transition-all duration-300 bg-white dark:bg-gray-800 shadow-sm"
                modifiersClassNames={{
                  selected: "bg-primary text-primary-foreground",
                  today: "border border-primary text-primary-foreground",
                  appointment: "appointment-day"
                }}
              />
            </div>
            
            <div className="md:col-span-4 mt-4 md:mt-0">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {dayjs(selectedDate).format('DD [de] MMMM [de] YYYY')}
                  </h3>
                  <Badge variant="outline" className="text-xs bg-primary-50 text-primary border-primary-200 dark:bg-primary-900/20 dark:text-primary-400 dark:border-primary-800">
                    {appointmentsForSelectedDate.length} {appointmentsForSelectedDate.length === 1 ? 'agendamento' : 'agendamentos'}
                  </Badge>
                </div>
                
                <div className="space-y-2 overflow-y-auto max-h-52">
                  {appointmentsForSelectedDate.length > 0 ? (
                    appointmentsForSelectedDate.map((appointment, index) => (
                      <motion.div 
                        key={appointment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-md transition-colors"
                      >
                        <div className="bg-primary/10 dark:bg-primary-900/30 text-primary dark:text-primary-300 w-12 text-center py-1 rounded text-xs font-medium">
                          {appointment.time.split(' ')[1]}
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-medium dark:text-gray-200">{appointment.clientName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{appointment.serviceName}</p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-400 dark:text-gray-500">
                      <p>Nenhum agendamento para esta data</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CalendarView;
