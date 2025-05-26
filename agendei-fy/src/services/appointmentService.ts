
import { toast } from '../components/ui/use-toast';
import { providers, services } from '../components/client/AppointmentForm';
import { AppointmentProps } from '../components/dashboard/AppointmentCard';

export interface AppointmentFormValues {
  service: string;
  provider: string;
  date: Date;
  time: string;
}

export async function createAppointment(
  values: AppointmentFormValues,
  clientName: string,
  serviceName: string = '',
  providerName: string = ''
) {
  // Format date for display
  const formattedDate = values.date.toLocaleDateString('pt-BR');
  
  // Find the service and provider names based on their IDs if not provided
  const finalServiceName = serviceName || services.find(s => s.id === values.service)?.name || '';
  const finalProviderName = providerName || providers.find(p => p.id === values.provider)?.name || '';
  
  // Return a promise to simulate an async operation
  return new Promise<AppointmentProps>(resolve => {
    setTimeout(() => {
      const newAppointment: AppointmentProps = {
        id: Date.now().toString(), // Generate a unique ID
        serviceName: finalServiceName,
        providerName: finalProviderName,
        time: `${formattedDate} ${values.time}`,
        clientName: clientName,
        clientImage: '',
        status: 'confirmed',
        service: values.service,
        provider: values.provider
      };
      
      toast({
        title: "Agendamento criado",
        description: `Agendamento confirmado para ${formattedDate} às ${values.time}.`,
      });
      
      resolve(newAppointment);
    }, 1000);
  });
}

export async function rescheduleAppointment(
  appointmentId: string, 
  values: AppointmentFormValues, 
  clientName: string,
  serviceName: string,
  providerName: string
) {
  // Format date for display
  const formattedDate = values.date.toLocaleDateString('pt-BR');
  
  // Return a promise to simulate an async operation
  return new Promise<AppointmentProps>(resolve => {
    setTimeout(() => {
      const updatedAppointment: AppointmentProps = {
        id: appointmentId,
        serviceName: serviceName,
        providerName: providerName,
        time: `${formattedDate} ${values.time}`,
        clientName: clientName,
        clientImage: '',
        status: 'confirmed',
        service: values.service,
        provider: values.provider
      };
      
      toast({
        title: "Agendamento atualizado",
        description: `Agendamento remarcado para ${formattedDate} às ${values.time}.`,
      });
      
      resolve(updatedAppointment);
    }, 1000);
  });
}

export async function cancelAppointment(appointmentId: string, serviceName: string) {
  // Return a promise to simulate an async operation
  return new Promise<string>(resolve => {
    setTimeout(() => {
      toast({
        title: "Agendamento cancelado",
        description: `Agendamento de ${serviceName} foi cancelado com sucesso.`,
      });
      
      resolve(appointmentId);
    }, 1000);
  });
}
