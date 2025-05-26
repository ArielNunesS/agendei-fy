
import React from 'react';
import { MessageSquare, X, ChevronDown, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { AppointmentProps } from './AppointmentCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card';

interface TodayAppointmentsProps {
  appointments: AppointmentProps[];
  onMessageClient: (appointment: AppointmentProps) => void;
  onCancelAppointment: (appointment: AppointmentProps) => void;
  showNewBadge?: boolean;
}

const TodayAppointments: React.FC<TodayAppointmentsProps> = ({
  appointments,
  onMessageClient,
  onCancelAppointment,
  showNewBadge = false
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <Card className="shadow-md dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden h-full">
      <CardHeader className="border-b border-gray-100 dark:border-gray-700 pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Agendamentos de Hoje
          </CardTitle>
          {showNewBadge && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 15 
              }}
            >
              <Badge className="bg-green-500 hover:bg-green-600 text-white px-2 py-1">
                <span className="animate-pulse mr-1">●</span> Novo
              </Badge>
            </motion.div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <AnimatePresence>
          {appointments.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {appointments.map((appointment, index) => (
                <motion.div 
                  key={appointment.id} 
                  className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center gap-4 transition-all duration-300 hover:shadow-md"
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  layout
                >
                  <div className="flex-shrink-0">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img 
                        src={appointment.clientImage || `https://i.pravatar.cc/150?img=${index + 5}`} 
                        alt={appointment.clientName} 
                        className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                      />
                    </motion.div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">{appointment.clientName}</h4>
                      <Badge 
                        variant="outline" 
                        className={`
                          text-xs px-1.5 py-0 
                          ${index % 3 === 0 ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' : 
                           index % 3 === 1 ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800' : 
                           'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'}
                        `}
                      >
                        {index % 3 === 0 ? (
                          <><CheckCircle2 className="h-3 w-3 mr-1" /> Confirmado</>
                        ) : index % 3 === 1 ? (
                          <><Clock className="h-3 w-3 mr-1" /> Pendente</>
                        ) : (
                          <><AlertCircle className="h-3 w-3 mr-1" /> Atenção</>
                        )}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{appointment.serviceName}</p>
                    <p className="text-sm font-medium text-primary">{appointment.time}</p>
                  </div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <motion.div whileTap={{ scale: 0.95 }}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 transition-colors duration-300"
                          >
                            Ações <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
                          </Button>
                        </motion.div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 animate-in fade-in-80 zoom-in-95">
                        <DropdownMenuItem 
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                          onClick={() => onMessageClient(appointment)}
                        >
                          <MessageSquare size={14} className="mr-2" /> Mensagem
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                          onClick={() => onCancelAppointment(appointment)}
                        >
                          <X size={14} className="mr-2" /> Cancelar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700"
            >
              <p className="mb-2">Nenhum agendamento para hoje</p>
              <p className="text-sm text-gray-400">Os agendamentos aparecerão aqui quando forem criados</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default TodayAppointments;

