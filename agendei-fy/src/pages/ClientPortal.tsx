/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { useAuth } from '../contexts/auth';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { PlusCircle } from 'lucide-react';
import AppointmentModal from '../components/client/AppointmentModal';
import CancelAppointmentModal from '../components/client/CancelAppointmentModal';
import AppointmentsList from '../components/client/AppointmentsList';
import AppointmentHistory from '../components/client/AppointmentHistory';
import AppointmentCalendar from '../components/client/AppointmentCalendar';

const ClientPortal = () => {
  const { profile } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // State for modals
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<{
    id: string;
    serviceName: string;
    time: string;
    service?: string;
    provider?: string;
  } | null>(null);
  
  // State for appointments
  const [appointments, setAppointments] = useState([
    {
      id: '1',
      serviceName: 'Corte de cabelo',
      providerName: 'Barbearia Silva',
      time: '24/05/2025 14:00',
      clientName: 'Carlos Silva',
      service: '1',
      provider: '1'
    },
    {
      id: '2',
      serviceName: 'Manicure e Pedicure',
      providerName: 'Studio Beauty',
      time: '26/05/2025 10:30',
      clientName: 'Ana Paula',
      service: '2',
      provider: '2'
    },
    {
      id: '3',
      serviceName: 'Massagem Relaxante',
      providerName: 'Spa Relax',
      time: '30/05/2025 16:45',
      clientName: 'Juliana Mendes',
      service: '3',
      provider: '3'
    }
  ]);

  const handleNewAppointment = () => {
    setIsNewAppointmentModalOpen(true);
  };

  const handleReschedule = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsRescheduleModalOpen(true);
  };

  const handleCancelAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsCancelModalOpen(true);
  };
  
  const handleAppointmentCreated = (newAppointment: any) => {
    setAppointments(prev => [...prev, newAppointment]);
  };
  
  const handleAppointmentRescheduled = (updatedAppointment: any) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === updatedAppointment.id ? updatedAppointment : appointment
      )
    );
  };
  
  const handleAppointmentCanceled = (appointmentId: string) => {
    setAppointments(prev => prev.filter(appointment => appointment.id !== appointmentId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-3xl font-bold text-primary dark:text-primary-300">Portal do Cliente</h1>
            <p className="text-gray-500 dark:text-gray-400">Bem-vindo(a), {profile?.name || 'Cliente'}!</p>
          </div>
          <Button 
            className="bg-primary hover:bg-primary-600"
            onClick={handleNewAppointment}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Agendamento
          </Button>
        </motion.div>

        <Tabs defaultValue="appointments" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="glass-card dark:bg-gray-800/50">
              <TabsTrigger value="appointments" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Meus Agendamentos
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Histórico
              </TabsTrigger>
              <TabsTrigger value="calendar" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Calendário
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="appointments">
            <AppointmentsList 
              appointments={appointments} 
              onNewAppointment={handleNewAppointment} 
              onReschedule={handleReschedule} 
              onCancelAppointment={handleCancelAppointment} 
            />
          </TabsContent>

          <TabsContent value="history">
            <AppointmentHistory />
          </TabsContent>

          <TabsContent value="calendar" className="flex justify-center">
            <AppointmentCalendar date={date} onDateChange={setDate} />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Modals */}
      <AppointmentModal 
        isOpen={isNewAppointmentModalOpen}
        onClose={() => setIsNewAppointmentModalOpen(false)}
        onSuccess={handleAppointmentCreated}
      />
      
      <AppointmentModal 
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        onSuccess={handleAppointmentRescheduled}
        isRescheduling={true}
        appointmentToReschedule={selectedAppointment ? {
          id: selectedAppointment.id,
          service: selectedAppointment.service || '',
          provider: selectedAppointment.provider || ''
        } : undefined}
      />
      
      <CancelAppointmentModal 
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onCanceled={handleAppointmentCanceled}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default ClientPortal;
