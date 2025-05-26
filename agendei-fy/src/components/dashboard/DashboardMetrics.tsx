
import React from 'react';
import { Users, Clock, Calendar, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants } from '../../utils/animationVariants';
import MetricCard from '../../components/dashboard/MetricCard';

interface DashboardMetricsProps {
  totalClients: number;
  activeAppointments: number;
  hoursBooked: number;
  monthlyEarnings: number;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  totalClients,
  activeAppointments,
  hoursBooked,
  monthlyEarnings
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      <MetricCard
        title="Total de Clientes"
        value={totalClients}
        icon={Users}
        trend={{ value: 12, isPositive: true }}
        iconClassName="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
      />
      <MetricCard
        title="Agendamentos Ativos"
        value={activeAppointments}
        icon={Calendar}
        trend={{ value: 8, isPositive: true }}
        iconClassName="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
      />
      <MetricCard
        title="Horas Agendadas"
        value={hoursBooked}
        icon={Clock}
        trend={{ value: 5, isPositive: true }}
        iconClassName="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
      />
      <MetricCard
        title="Faturamento Mensal"
        value={`R$ ${monthlyEarnings}`}
        icon={PieChart}
        trend={{ value: 15, isPositive: true }}
        iconClassName="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
      />
    </motion.div>
  );
};

export default DashboardMetrics;
