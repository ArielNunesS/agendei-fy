
import { useState } from 'react';
import { AppointmentProps } from '../../components/dashboard/AppointmentCard';
import { toast } from '../../components/ui/use-toast';

interface UseAppointmentActionsReturn {
  selectedAppointment: AppointmentProps | null;
  cancelModalOpen: boolean;
  createModalOpen: boolean;
  isCreatingAppointment: boolean;
  showNewAppointmentBadge: boolean;
  handleCancelAppointment: (appointment: AppointmentProps) => void;
  handleCreateAppointment: () => void;
  handleMessageClient: (appointment: AppointmentProps) => void;
  handleConfirmCancellation: (appointment: AppointmentProps, message: string) => void;
  handleAppointmentCreated: (newAppointment: AppointmentProps) => void;
  setCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCancelModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAppointmentActions = (
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentProps[]>>
): UseAppointmentActionsReturn => {
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentProps | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
  const [showNewAppointmentBadge, setShowNewAppointmentBadge] = useState(false);

  // Function to handle appointment cancellation
  const handleCancelAppointment = (appointment: AppointmentProps) => {
    setSelectedAppointment(appointment);
    setCancelModalOpen(true);
  };

  // Function to create new appointment
  const handleCreateAppointment = () => {
    setIsCreatingAppointment(true);
    setTimeout(() => {
      setCreateModalOpen(true);
      setIsCreatingAppointment(false);
    }, 300); // Small delay to show loading state for better UX
  };

  // Function to handle message to client
  const handleMessageClient = (appointment: AppointmentProps) => {
    console.log("Mensagem para:", appointment.clientName);
    // Implementação futura do sistema de mensagens
  };

  // Function to handle confirm cancellation
  const handleConfirmCancellation = (appointment: AppointmentProps, message: string) => {
    console.log("Cancelado:", appointment, "Motivo:", message);
    toast({
      title: "Agendamento cancelado",
      description: `O agendamento de ${appointment.clientName} foi cancelado com sucesso.`,
    });
  };

  // Function to handle new appointment creation
  const handleAppointmentCreated = (newAppointment: AppointmentProps) => {
    setAppointments(prev => [...prev, newAppointment]);
    setShowNewAppointmentBadge(true);
    
    toast({
      title: "Horário criado com sucesso",
      description: `Agendamento para ${newAppointment.clientName} foi confirmado.`,
      variant: "default",
    });
    
    setTimeout(() => {
      setShowNewAppointmentBadge(false);
    }, 5000);
  };

  return {
    selectedAppointment,
    cancelModalOpen,
    createModalOpen,
    isCreatingAppointment,
    showNewAppointmentBadge,
    handleCancelAppointment,
    handleCreateAppointment,
    handleMessageClient,
    handleConfirmCancellation,
    handleAppointmentCreated,
    setCreateModalOpen,
    setCancelModalOpen
  };
};
