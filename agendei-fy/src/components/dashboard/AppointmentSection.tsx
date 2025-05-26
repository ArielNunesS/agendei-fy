
import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../../utils/animationVariants';
import { AppointmentProps } from '../../components/dashboard/AppointmentCard';
import TodayAppointments from '../../components/dashboard/TodayAppointments';
import UpcomingAppointments from '../../components/dashboard/UpcomingAppointments';

interface AppointmentSectionProps {
  todayAppointments: AppointmentProps[];
  futureAppointments: AppointmentProps[];
  onMessageClient: (appointment: AppointmentProps) => void;
  onCancelAppointment: (appointment: AppointmentProps) => void;
  showNewBadge: boolean;
}

const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  todayAppointments,
  futureAppointments,
  onMessageClient,
  onCancelAppointment,
  showNewBadge
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
    >
      <motion.div 
        variants={itemVariants}
        className="h-full"
      >
        <TodayAppointments 
          appointments={todayAppointments}
          onMessageClient={onMessageClient}
          onCancelAppointment={onCancelAppointment}
          showNewBadge={showNewBadge}
        />
      </motion.div>
      <motion.div 
        variants={itemVariants}
        className="h-full"
      >
        <UpcomingAppointments 
          appointments={futureAppointments} 
          title="Próximos Agendamentos" 
        />
      </motion.div>
    </motion.div>
  );
};

export default AppointmentSection;
