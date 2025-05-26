
import React, { useState } from 'react';
import { format, startOfToday, addDays, addWeeks, startOfWeek, endOfWeek, eachDayOfInterval, isToday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, User, MapPin } from 'lucide-react';
import ModernDashboardLayout from '../components/dashboard/ModernDashboardLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { cn } from '../lib/utils';

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

// Mock data
const mockAppointments = [
  {
    id: 1,
    date: '2025-05-23',
    time: '09:00',
    duration: 30,
    clientName: 'Maria Silva',
    clientAvatar: 'https://i.pravatar.cc/150?img=1',
    service: 'Corte Feminino',
    professional: 'Ana Paula',
    professionalAvatar: 'https://i.pravatar.cc/150?img=5',
    status: 'confirmed'
  },
  {
    id: 2,
    date: '2025-05-23',
    time: '10:30',
    duration: 60,
    clientName: 'João Pereira',
    clientAvatar: 'https://i.pravatar.cc/150?img=3',
    service: 'Barba e Cabelo',
    professional: 'Ricardo Gomes',
    professionalAvatar: 'https://i.pravatar.cc/150?img=8',
    status: 'confirmed'
  },
  {
    id: 3,
    date: '2025-05-23',
    time: '14:00',
    duration: 45,
    clientName: 'Carolina Santos',
    clientAvatar: 'https://i.pravatar.cc/150?img=9',
    service: 'Manicure',
    professional: 'Juliana Costa',
    professionalAvatar: 'https://i.pravatar.cc/150?img=4',
    status: 'pending'
  },
  {
    id: 4,
    date: '2025-05-24',
    time: '11:00',
    duration: 90,
    clientName: 'Fernanda Lima',
    clientAvatar: 'https://i.pravatar.cc/150?img=10',
    service: 'Limpeza de pele',
    professional: 'Ana Paula',
    professionalAvatar: 'https://i.pravatar.cc/150?img=5',
    status: 'confirmed'
  },
  {
    id: 5,
    date: '2025-05-24',
    time: '15:30',
    duration: 30,
    clientName: 'Roberto Carlos',
    clientAvatar: 'https://i.pravatar.cc/150?img=12',
    service: 'Corte Masculino',
    professional: 'Ricardo Gomes',
    professionalAvatar: 'https://i.pravatar.cc/150?img=8',
    status: 'cancelled'
  },
];

const CalendarPage: React.FC = () => {
  const today = startOfToday();
  const [currentDate, setCurrentDate] = useState(today);
  const [weekStart, setWeekStart] = useState(startOfWeek(today, { weekStartsOn: 0 }));
  const [activeTab, setActiveTab] = useState<'day' | 'week' | 'month'>('day');
  
  const days = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(weekStart, { weekStartsOn: 0 }),
  });
  
  const handlePreviousDay = () => {
    setCurrentDate(prev => addDays(prev, -1));
  };
  
  const handleNextDay = () => {
    setCurrentDate(prev => addDays(prev, 1));
  };
  
  const handlePreviousWeek = () => {
    setWeekStart(prev => addWeeks(prev, -1));
  };
  
  const handleNextWeek = () => {
    setWeekStart(prev => addWeeks(prev, 1));
  };
  
  const getAppointmentsByDate = (date: string) => {
    return mockAppointments.filter(appointment => appointment.date === date);
  };
  
  const statusColors = {
    confirmed: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  };
  
  return (
    <ModernDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
            <p className="text-muted-foreground">Gerencie seus agendamentos.</p>
          </div>
          <Button className="shrink-0 shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={activeTab === 'day' ? 'bg-primary/10' : ''} 
              onClick={() => setActiveTab('day')}
            >
              Dia
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={activeTab === 'week' ? 'bg-primary/10' : ''} 
              onClick={() => setActiveTab('week')}
            >
              Semana
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={activeTab === 'month' ? 'bg-primary/10' : ''} 
              onClick={() => setActiveTab('month')}
            >
              Mês
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={activeTab === 'day' ? handlePreviousDay : handlePreviousWeek}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="min-w-[180px]" 
              onClick={() => setCurrentDate(today)}
            >
              {activeTab === 'day' ? (
                format(currentDate, "dd 'de' MMMM, yyyy", { locale: ptBR })
              ) : (
                `${format(weekStart, "dd/MM", { locale: ptBR })} - ${format(
                  endOfWeek(weekStart, { weekStartsOn: 0 }),
                  "dd/MM",
                  { locale: ptBR }
                )}`
              )}
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={activeTab === 'day' ? handleNextDay : handleNextWeek}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {activeTab === 'day' && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">
                Agendamentos para {format(currentDate, "dd 'de' MMMM", { locale: ptBR })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getAppointmentsByDate(format(currentDate, 'yyyy-MM-dd')).length > 0 ? (
                  getAppointmentsByDate(format(currentDate, 'yyyy-MM-dd')).map(appointment => (
                    <div 
                      key={appointment.id} 
                      className="flex flex-col md:flex-row border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-[220px] mb-3 md:mb-0">
                        <div className="flex flex-col items-center justify-center bg-primary/10 dark:bg-primary/20 rounded-lg p-2 h-14 w-14 text-center">
                          <span className="text-lg font-semibold">{appointment.time.substring(0, 2)}</span>
                          <span className="text-xs">{appointment.time.substring(3, 5)}h</span>
                        </div>
                        <div>
                          <div className="font-medium">{appointment.service}</div>
                          <div className="text-sm text-muted-foreground">{appointment.duration} minutos</div>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={appointment.clientAvatar} alt={appointment.clientName} />
                            <AvatarFallback>{appointment.clientName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{appointment.clientName}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <User className="h-3 w-3 opacity-70" />
                              <span>Cliente</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={appointment.professionalAvatar} alt={appointment.professional} />
                            <AvatarFallback>{appointment.professional.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{appointment.professional}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3 opacity-70" />
                              <span>Profissional</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Badge className={`${
                            appointment.status === 'confirmed' ? statusColors.confirmed :
                            appointment.status === 'pending' ? statusColors.pending :
                            statusColors.cancelled
                          }`}>
                            {appointment.status === 'confirmed' ? 'Confirmado' :
                             appointment.status === 'pending' ? 'Pendente' :
                             'Cancelado'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">Nenhum agendamento nesta data</h3>
                    <p className="text-muted-foreground">Clique em "+ Novo Agendamento" para adicionar.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'week' && (
          <Card>
            <CardHeader className="px-6 py-4">
              <div className="grid grid-cols-7 text-center">
                {days.map((day) => (
                  <div key={day.toString()} className="py-2">
                    <div className="text-sm text-muted-foreground">
                      {format(day, 'EEE', { locale: ptBR })}
                    </div>
                    <div className={cn(
                      "text-base font-semibold mt-1",
                      isToday(day) && "flex items-center justify-center bg-primary text-primary-foreground rounded-full w-8 h-8 mx-auto"
                    )}>
                      {format(day, 'd')}
                    </div>
                  </div>
                ))}
              </div>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <div className="grid grid-cols-7 gap-1">
                {days.map((day) => {
                  const formattedDate = format(day, 'yyyy-MM-dd');
                  const dailyAppointments = getAppointmentsByDate(formattedDate);
                  
                  return (
                    <div key={day.toString()} className="min-h-80 border-r last:border-r-0 p-1">
                      {dailyAppointments.length > 0 ? (
                        dailyAppointments.map(appointment => (
                          <div
                            key={`${day}-${appointment.id}`}
                            className={cn(
                              "px-1.5 py-1 my-1 text-xs rounded border",
                              appointment.status === 'confirmed' ? "bg-primary/10 border-primary/20" :
                              appointment.status === 'pending' ? "bg-amber-100/50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30" :
                              "bg-red-100/50 border-red-200 dark:bg-red-900/20 dark:border-red-800/30"
                            )}
                          >
                            <div className="font-medium">{appointment.time}</div>
                            <div className="mt-1 font-medium truncate">{appointment.clientName}</div>
                            <div className="text-muted-foreground truncate">
                              {appointment.service}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-center h-20 text-xs text-center text-muted-foreground">
                          <span>Nenhum agendamento</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'month' && (
          <div className="text-center py-12 border rounded-lg bg-muted/50">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">Visão por mês</h3>
            <p className="text-muted-foreground max-w-md mx-auto mt-2">
              Esta visualização está em desenvolvimento. Por favor, utilize as visões de dia ou semana para gerenciar seus agendamentos.
            </p>
          </div>
        )}
      </div>
    </ModernDashboardLayout>
  );
};

export default CalendarPage;
