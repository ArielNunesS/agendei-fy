
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { Badge } from '../ui/badge';
import { CalendarCheck } from 'lucide-react';

interface AppointmentCalendarProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ date, onDateChange }) => {
  // Simular dias com agendamentos (em uma aplicação real, estes dados viriam do backend)
  const datesWithAppointments = useMemo(() => {
    const currentDate = new Date();
    const dates = [];
    
    // Gerar algumas datas aleatórias com agendamentos para o mês atual
    for (let i = 0; i < 5; i++) {
      const randomDay = Math.floor(Math.random() * 28) + 1;
      const appointmentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), randomDay);
      dates.push(appointmentDate);
    }
    
    return dates;
  }, []);

  // Função para personalizar dias no calendário
  const dayClassNames = (date: Date): string => {
    const isAppointmentDate = datesWithAppointments.some(
      d => d.getDate() === date.getDate() && 
           d.getMonth() === date.getMonth() && 
           d.getFullYear() === date.getFullYear()
    );
    
    return isAppointmentDate ? 'appointment-day' : '';
  };

  return (
    <div className="flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card dark:bg-gray-800/30 dark:border-gray-700 p-5 rounded-xl shadow-lg max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-primary dark:text-primary-300">Meu Calendário</h3>
          <CalendarCheck className="h-5 w-5 text-primary dark:text-primary-300" />
        </div>
        
        <div className="calendar-wrapper relative">
          <style>
            {`
            .appointment-day::after {
              content: '';
              position: absolute;
              bottom: 2px;
              left: 50%;
              transform: translateX(-50%);
              width: 4px;
              height: 4px;
              background-color: #4169E1;
              border-radius: 50%;
            }
            
            .dark .appointment-day::after {
              background-color: #5a8dee;
            }
            `}
          </style>
          
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={onDateChange}
            className="rounded-md border shadow-sm bg-white dark:bg-gray-800 p-1"
            modifiers={{
              hasAppointment: datesWithAppointments
            }}
            modifiersClassNames={{
              appointment: "appointment-day"
            }}
          />
        </div>
        
        <div className="mt-6 space-y-3">
          {date && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <h4 className="font-medium">Agendamentos para {date.toLocaleDateString('pt-BR')}</h4>
              </div>
              {Math.random() > 0.5 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Nenhum agendamento para esta data.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-sm">14:00 - Corte de Cabelo</p>
                      <Badge variant="outline" className="bg-primary/5 text-primary text-xs">Confirmado</Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Barbearia Silva</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AppointmentCalendar;
