
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { cancelAppointment } from '../../services/appointmentService';

interface CancelAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCanceled: (appointmentId: string) => void;
  appointment: {
    id: string;
    serviceName: string;
    time: string;
  } | null;
}

const CancelAppointmentModal: React.FC<CancelAppointmentModalProps> = ({
  isOpen,
  onClose,
  onCanceled,
  appointment
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleCancel = async () => {
    if (!appointment) return;
    
    setIsSubmitting(true);
    
    try {
      // Use the cancelAppointment service function
      const canceledAppointmentId = await cancelAppointment(appointment.id, appointment.serviceName);
      
      // Notifies the parent component that the appointment was canceled
      onCanceled(canceledAppointmentId);
      onClose();
    } catch (error) {
      console.error('Error canceling appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancelar Agendamento</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-2">
          <p><span className="font-medium">Serviço:</span> {appointment.serviceName}</p>
          <p><span className="font-medium">Data e Hora:</span> {appointment.time}</p>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Voltar
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processando...' : 'Confirmar Cancelamento'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelAppointmentModal;
