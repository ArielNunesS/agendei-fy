
import { useState, useEffect } from 'react';
import { AppointmentProps } from '../components/dashboard/AppointmentCard';
import { getTodayAppointments, getFutureAppointments, getEarnings } from '../data/mockAppointments';

interface DashboardData {
  todayAppointments: AppointmentProps[];
  futureAppointments: AppointmentProps[];
  earnings: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  stats: {
    totalClients: number;
    hoursBooked: number;
    activeAppointments: number;
  };
  weeklyAppointmentsData: {
    name: string;
    agendamentos: number;
  }[];
  occupancyData: {
    name: string;
    value: number;
  }[];
  daysRemaining: number;
}

export const useDashboardData = (): [DashboardData, React.Dispatch<React.SetStateAction<number>>] => {
  const [daysRemaining, setDaysRemaining] = useState(7);
  
  // Load mock data
  const todayAppointments = getTodayAppointments();
  const futureAppointments = getFutureAppointments();
  const earnings = getEarnings();
  
  // Stats data
  const stats = {
    totalClients: 42,
    hoursBooked: 56,
    activeAppointments: 12
  };

  // Charts data
  const weeklyAppointmentsData = [
    { name: 'Seg', agendamentos: 4 },
    { name: 'Ter', agendamentos: 6 },
    { name: 'Qua', agendamentos: 8 },
    { name: 'Qui', agendamentos: 5 },
    { name: 'Sex', agendamentos: 9 },
    { name: 'Sab', agendamentos: 11 },
    { name: 'Dom', agendamentos: 3 }
  ];

  const occupancyData = [
    { name: 'Ocupados', value: 70 },
    { name: 'Disponíveis', value: 30 }
  ];
  
  useEffect(() => {
    // Mock countdown for trial period
    const timer = setInterval(() => {
      setDaysRemaining(prev => (prev > 0 ? prev - 0.01 : 0));
    }, 86400000); // Update every day in ms
    
    return () => clearInterval(timer);
  }, []);

  return [
    {
      todayAppointments,
      futureAppointments,
      earnings,
      stats,
      weeklyAppointmentsData,
      occupancyData,
      daysRemaining
    },
    setDaysRemaining
  ];
};
