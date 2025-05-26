
import { AppointmentProps } from '@/components/dashboard/AppointmentCard';

// Mock data for appointments
export const mockAppointments: AppointmentProps[] = [
  {
    id: '1',
    clientName: 'Ana Silva',
    serviceName: 'Corte de cabelo',
    providerName: 'Carlos Barbeiro',
    time: '09:00',
    clientImage: 'https://i.pravatar.cc/150?img=1',
    status: 'confirmed'
  },
  {
    id: '2',
    clientName: 'Bruno Martins',
    serviceName: 'Barba',
    providerName: 'Carlos Barbeiro',
    time: '10:30',
    clientImage: 'https://i.pravatar.cc/150?img=3',
    status: 'confirmed'
  },
  {
    id: '3',
    clientName: 'Carla Ferreira',
    serviceName: 'Manicure',
    providerName: 'Paula Manicure',
    time: '13:00',
    clientImage: 'https://i.pravatar.cc/150?img=5',
    status: 'pending'
  },
  {
    id: '4',
    clientName: 'Daniel Rodrigues',
    serviceName: 'Massagem',
    providerName: 'Marcos Massoterapeuta',
    time: '15:00',
    clientImage: 'https://i.pravatar.cc/150?img=7',
    status: 'canceled'
  },
  {
    id: '5',
    clientName: 'Elena Costa',
    serviceName: 'Depilação',
    providerName: 'Lucia Depiladora',
    time: '16:30',
    clientImage: 'https://i.pravatar.cc/150?img=9',
    status: 'confirmed'
  }
];

// Get today's appointments
export const getTodayAppointments = (): AppointmentProps[] => {
  return mockAppointments.slice(0, 3);
};

// Get future appointments
export const getFutureAppointments = (): AppointmentProps[] => {
  return mockAppointments.slice(2);
};

// Mock earnings data
export const getEarnings = () => {
  return {
    daily: 180.00,
    weekly: 580.00,
    monthly: 2350.00
  };
};
