
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth';
import { Loader2 } from 'lucide-react';
import { AppointmentProps } from '../components/dashboard/AppointmentCard';
import ModernDashboardLayout from '../components/dashboard/ModernDashboardLayout';
import ModernDashboardHeader from '../components/dashboard/ModernDashboardHeader';
import AppointmentChart from '../components/dashboard/AppointmentChart';
import AppointmentModal from '../components/client/AppointmentModal';
import CancelAppointmentModal from '../components/dashboard/CancelAppointmentModal';
import DashboardMetrics from '../components/dashboard/DashboardMetrics';
import AppointmentSection from '../components/dashboard/AppointmentSection';
import { useDashboardData } from '../hooks/useDashboardData';
import { useAppointmentActions } from '../hooks/useAppointmentActions';

const ProviderDashboard = () => {
  const { profile, loading, getProfile } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  
  // Custom hooks for data and actions
  const [dashboardData, setDaysRemaining] = useDashboardData();
  const {
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
  } = useAppointmentActions(setAppointments);
  
  useEffect(() => {
    if (!profile) {
      getProfile();
    }

    // Load appointments
    setAppointments([...dashboardData.todayAppointments, ...dashboardData.futureAppointments]);

    // Check for persistent login
    const checkSession = () => {
      const savedSession = localStorage.getItem('userSession');
      const savedTime = localStorage.getItem('sessionTime');
      
      if (savedSession && savedTime) {
        const expiryTime = new Date(parseInt(savedTime));
        const currentTime = new Date();
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        
        if (currentTime.getTime() - expiryTime.getTime() < thirtyDaysInMs) {
          // Session still valid
          console.log("Using saved session");
        } else {
          // Session expired
          localStorage.removeItem('userSession');
          localStorage.removeItem('sessionTime');
        }
      } else if (profile) {
        // Save new session
        localStorage.setItem('userSession', profile.id);
        localStorage.setItem('sessionTime', Date.now().toString());
      }
    };
    
    checkSession();
  }, [profile, getProfile, dashboardData.todayAppointments, dashboardData.futureAppointments]);

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ModernDashboardLayout>
      {/* Dashboard header with create button */}
      <ModernDashboardHeader 
        isCreatingAppointment={isCreatingAppointment}
        handleCreateAppointment={handleCreateAppointment}
        daysRemaining={dashboardData.daysRemaining}
      />
      
      {/* Metrics section */}
      <DashboardMetrics
        totalClients={dashboardData.stats.totalClients}
        activeAppointments={dashboardData.stats.activeAppointments}
        hoursBooked={dashboardData.stats.hoursBooked}
        monthlyEarnings={dashboardData.earnings.monthly}
      />
      
      {/* Charts section */}
      <div className="mb-8">
        <AppointmentChart 
          weeklyData={dashboardData.weeklyAppointmentsData}
          occupancyData={dashboardData.occupancyData}
        />
      </div>
      
      {/* Appointments section */}
      <AppointmentSection 
        todayAppointments={dashboardData.todayAppointments}
        futureAppointments={dashboardData.futureAppointments}
        onMessageClient={handleMessageClient}
        onCancelAppointment={handleCancelAppointment}
        showNewBadge={showNewAppointmentBadge}
      />

      {/* Modals */}
      {cancelModalOpen && (
        <CancelAppointmentModal 
          appointment={selectedAppointment}
          onClose={() => setCancelModalOpen(false)}
          onConfirm={handleConfirmCancellation}
        />
      )}

      {createModalOpen && (
        <AppointmentModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSuccess={handleAppointmentCreated}
          isRescheduling={false}
        />
      )}
    </ModernDashboardLayout>
  );
};

export default ProviderDashboard;
