import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from '../../contexts/auth/useAuth';
import { toast } from '@/components/ui/use-toast';
import AppointmentForm, { AppointmentFormValues } from './AppointmentForm';
import { createAppointment, rescheduleAppointment } from '@/services/appointmentService';
import { services, providers } from './AppointmentForm';
import { AppointmentProps } from '@/components/dashboard/AppointmentCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newAppointment: AppointmentProps) => void;
  isRescheduling?: boolean;
  appointmentToReschedule?: {
    id: string;
    service: string;
    provider: string;
  };
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  isRescheduling = false,
  appointmentToReschedule
}) => {
  const { profile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const defaultValues = {
    service: appointmentToReschedule?.service || '',
    provider: appointmentToReschedule?.provider || '',
    date: new Date(),
    time: '',
  };

  const handleSubmit = async (values: AppointmentFormValues) => {
    if (!profile) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para agendar.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (isRescheduling && appointmentToReschedule) {
        // Find the service and provider names based on their IDs
        const serviceName = services.find(s => s.id === values.service)?.name || '';
        const providerName = providers.find(p => p.id === values.provider)?.name || '';
        
        const updatedAppointment = await rescheduleAppointment(
          appointmentToReschedule.id,
          values,
          profile.name,
          serviceName,
          providerName
        );
        
        onSuccess(updatedAppointment);
      } else {
        // For provider creating appointment on behalf of a client
        const serviceName = services.find(s => s.id === values.service)?.name || '';
        const providerName = profile.user_type === 'prestador' 
          ? profile.name 
          : providers.find(p => p.id === values.provider)?.name || '';
          
        const clientName = profile.user_type === 'prestador' 
          ? "Cliente via prestador" 
          : profile.name;

        const newAppointment = await createAppointment(
          values, 
          clientName,
          serviceName,
          providerName
        );
        
        onSuccess(newAppointment);
      }
      
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar seu agendamento. Por favor, tente novamente.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      transition: { 
        duration: 0.2,
        ease: "easeIn"
      } 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden p-0">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              className="w-full"
            >
              <DialogHeader className="p-6 pb-2">
                <DialogTitle className="text-xl">
                  {isRescheduling ? 'Reagendar Horário' : 'Novo Agendamento'}
                </DialogTitle>
                <DialogDescription>
                  {isRescheduling 
                    ? 'Selecione uma nova data e horário para seu agendamento.'
                    : 'Preencha os detalhes abaixo para agendar um novo horário.'}
                </DialogDescription>
              </DialogHeader>
              
              <ScrollArea className="max-h-[60vh]">
                <div className="px-6 py-2">
                  <AppointmentForm
                    defaultValues={defaultValues}
                    isRescheduling={isRescheduling}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                  
                  <DialogFooter className="pt-4 mt-4">
                    <Button type="button" variant="outline" onClick={onClose} className="transition-transform duration-200 active:scale-95">
                      Cancelar
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => document.querySelector('form')?.dispatchEvent(
                        new Event('submit', { cancelable: true, bubbles: true })
                      )}
                      disabled={isSubmitting}
                      className="transition-transform duration-200 active:scale-95 relative"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          <span>Processando...</span>
                        </>
                      ) : (
                        <span>{isRescheduling ? 'Reagendar' : 'Agendar'}</span>
                      )}
                    </Button>
                  </DialogFooter>
                </div>
              </ScrollArea>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default AppointmentModal;
