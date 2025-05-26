
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { FileText } from 'lucide-react';

type AppointmentHistoryProps = object

const AppointmentHistory: React.FC<AppointmentHistoryProps> = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Mock data for appointment history
  const historyItems = [
    {
      service: 'Corte de Cabelo',
      date: '10/04/2025 às 14:30',
      price: 'R$ 45,00',
      paymentMethod: 'Cartão de Crédito'
    },
    {
      service: 'Tratamento Facial',
      date: '25/03/2025 às 10:00',
      price: 'R$ 120,00',
      paymentMethod: 'PIX'
    },
    {
      service: 'Manicure',
      date: '12/03/2025 às 15:45',
      price: 'R$ 65,00',
      paymentMethod: 'Dinheiro'
    },
    {
      service: 'Massagem',
      date: '28/02/2025 às 11:30',
      price: 'R$ 150,00',
      paymentMethod: 'Cartão de Débito'
    },
    {
      service: 'Design de Sobrancelhas',
      date: '15/02/2025 às 09:15',
      price: 'R$ 35,00',
      paymentMethod: 'PIX'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {historyItems.map((item, i) => (
        <motion.div key={i} variants={itemVariants}>
          <Card className="glass-card dark:bg-gray-800/30 dark:border-gray-700">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20">
                  <FileText className="h-6 w-6 text-primary dark:text-primary-300" />
                </div>
                <div>
                  <h3 className="font-medium">{item.service}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-primary dark:text-primary-300 font-bold">{item.price}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.paymentMethod}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AppointmentHistory;
