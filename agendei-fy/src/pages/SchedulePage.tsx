
import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { format, addDays, eachDayOfInterval, parseISO, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ModernDashboardLayout from '../components/dashboard/ModernDashboardLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { cn } from '../lib/utils';

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

const mockProfessionals = [
  { id: 1, name: 'Ana Paula', availability: ['08:00', '08:30', '09:00', '09:30', '13:00', '13:30', '14:00'] },
  { id: 2, name: 'Ricardo', availability: ['10:00', '10:30', '11:00', '11:30', '15:00', '15:30', '16:00'] },
  { id: 3, name: 'Juliana', availability: ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'] }
];

const mockSchedules = [
  { id: 1, day: '2025-05-23', time: '09:00', professionalId: 1, clientName: 'Maria da Silva', service: 'Corte Feminino' },
  { id: 2, day: '2025-05-23', time: '14:00', professionalId: 3, clientName: 'José Pereira', service: 'Corte Masculino' },
  { id: 3, day: '2025-05-24', time: '10:00', professionalId: 2, clientName: 'Camila Santos', service: 'Manicure' },
];

const SchedulePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  
  const days = eachDayOfInterval({
    start: selectedDate,
    end: addDays(selectedDate, 6),
  });

  return (
    <ModernDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Horários</h1>
            <p className="text-muted-foreground">Configure os horários disponíveis para agendamentos.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setSelectedDate(new Date())}>
              <CalendarIcon className="h-4 w-4" />
            </Button>
            <div className="flex items-center bg-muted border rounded-md p-1">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-7 w-7"
                onClick={() => setSelectedDate(addDays(selectedDate, -7))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm px-2">
                {format(selectedDate, 'd MMMM', { locale: ptBR })} - {format(addDays(selectedDate, 6), 'd MMMM', { locale: ptBR })}
              </span>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-7 w-7"
                onClick={() => setSelectedDate(addDays(selectedDate, 7))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="timeline">Linha do tempo</TabsTrigger>
            <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="timeline" className="mt-0">
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
                  {days.map((day) => (
                    <div key={day.toString()} className="min-h-80 border-r last:border-r-0 p-1">
                      {timeSlots.map((time) => {
                        const scheduled = mockSchedules.find(
                          s => s.day === format(day, 'yyyy-MM-dd') && s.time === time
                        );
                        
                        return (
                          <div 
                            key={`${day}-${time}`} 
                            className={cn(
                              "px-1.5 py-1 my-1 text-xs rounded",
                              scheduled 
                                ? "bg-primary/10 border border-primary/20 hover:bg-primary/20 cursor-pointer transition-colors" 
                                : "border border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span>{time}</span>
                              {scheduled && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                                      <MoreVertical className="h-3 w-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                                    <DropdownMenuItem>Reagendar</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Cancelar</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                            </div>
                            {scheduled && (
                              <div className="mt-1 font-medium">
                                {scheduled.clientName}
                                <div className="text-muted-foreground whitespace-nowrap text-ellipsis overflow-hidden">
                                  {scheduled.service}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="availability" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Disponibilidade dos Profissionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockProfessionals.map(professional => (
                    <div key={professional.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">{professional.name}</h3>
                        <Button variant="outline" size="sm">Editar horários</Button>
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {days.map((day) => (
                          <div key={`${professional.id}-${day}`} className="border rounded-md p-2">
                            <div className="text-center border-b pb-1 mb-2">
                              <div className="text-xs text-muted-foreground">
                                {format(day, 'EEE', { locale: ptBR })}
                              </div>
                              <div className="font-medium">
                                {format(day, 'd')}
                              </div>
                            </div>
                            <div className="space-y-1">
                              {timeSlots
                                .filter((_, index) => index < 6)
                                .map((time) => {
                                  const isAvailable = professional.availability.includes(time);
                                  const isBooked = mockSchedules.some(
                                    s => s.day === format(day, 'yyyy-MM-dd') && 
                                         s.time === time && 
                                         s.professionalId === professional.id
                                  );
                                  
                                  return (
                                    <div 
                                      key={`${professional.id}-${day}-${time}`}
                                      className={cn(
                                        "text-xs px-1.5 py-1 rounded text-center",
                                        isBooked 
                                          ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
                                          : isAvailable 
                                            ? "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300"
                                            : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                                      )}
                                    >
                                      {time}
                                    </div>
                                  );
                                })
                              }
                              {professional.availability.length > 6 && (
                                <div className="text-center text-xs text-muted-foreground">
                                  +{professional.availability.length - 6} mais
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ModernDashboardLayout>
  );
};

export default SchedulePage;
