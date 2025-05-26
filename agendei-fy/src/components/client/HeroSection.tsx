
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Bell, UserCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/card';
import { Button } from "../../components/ui/button";
import { ChevronRight } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { containerVariants, itemVariants } from '../../utils/animationVariations';

interface HeroSectionProps {
  userName?: string;
}

const HeroSection = ({ userName }: HeroSectionProps) => {
  // Função para saudação baseada no horário
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "☀️ Bom dia";
    if (hour < 18) return "🌤️ Boa tarde";
    return "🌙 Boa noite";
  };

  // Mock data para próximo agendamento
  const nextAppointment = {
    service: "Corte de Cabelo",
    date: "em 2 dias",
    time: "14:30"
  };

  const hasAppointments = true; // Simular se tem agendamentos

  return (
    <div className="relative overflow-hidden pb-10">
      {/* Background gradients and shapes */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 z-0"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-indigo-400/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 pt-10 pb-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full mb-6"
          >
            <UserCircle className="h-10 w-10 text-primary" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 dark:text-white"
          >
            {getGreeting()}, <span className="text-primary">{userName || 'Cliente'}</span>!
          </motion.h1>
          
          {hasAppointments && nextAppointment ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 max-w-md mx-auto border border-gray-200 dark:border-gray-700 shadow-sm mb-4"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Seu próximo serviço:</p>
              <p className="font-semibold text-gray-900 dark:text-white">{nextAppointment.service} {nextAppointment.date}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">às {nextAppointment.time}</p>
              <Link to="/portal-cliente">
                <Button size="sm" className="mt-2 w-full">
                  Ver detalhes <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Organize seus agendamentos e aproveite ao máximo os serviços disponíveis para você
            </motion.p>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8"
        >
          <QuickActionCard 
            title="Meus Agendamentos"
            description={hasAppointments ? "Visualize e gerencie todos os seus agendamentos" : "Você ainda não tem agendamentos"}
            icon={<Calendar className="mr-2 h-5 w-5" />}
            info={hasAppointments ? "3 agendamentos nos próximos dias" : "Que tal explorar os serviços?"}
            linkTo="/portal-cliente"
            color="primary"
            badge={hasAppointments ? "3 ativos" : "Vazio"}
            isEmpty={!hasAppointments}
          />

          <QuickActionCard 
            title="Novidades"
            description="Promoções e novos serviços disponíveis"
            icon={<Bell className="mr-2 h-5 w-5" />}
            info="2 promoções ativas este mês"
            linkTo="/novidades"
            color="indigo-500"
            badge="Promoção"
            isPromotion={true}
          />

          <QuickActionCard 
            title="Meu Perfil"
            description="Complete seu perfil para melhor experiência"
            icon={<UserCircle className="mr-2 h-5 w-5" />}
            info="Adicione seu telefone para completar 100%"
            linkTo="/perfil"
            color="purple-500"
            badge="80% completo"
            progress={80}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            Ver todos os serviços
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  info: string;
  linkTo: string;
  color: string;
  badge?: string;
  isEmpty?: boolean;
  isPromotion?: boolean;
  progress?: number;
}

const QuickActionCard = ({ 
  title, 
  description, 
  icon, 
  info, 
  linkTo, 
  color, 
  badge, 
  isEmpty, 
  isPromotion, 
  progress 
}: QuickActionCardProps) => {
  return (
    <motion.div variants={itemVariants}>
      <Link to={linkTo}>
        <Card className={`h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden group ${isEmpty ? 'border-dashed border-gray-300' : ''}`}>
          <div className={`h-1.5 w-full ${isPromotion ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : `bg-${color}`}`}></div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center text-gray-800 dark:text-white">
                {icon} {title}
              </CardTitle>
              {badge && (
                <Badge 
                  variant="secondary" 
                  className={`${isPromotion ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-orange-400' : 'bg-primary/10 text-primary dark:bg-primary/20'} text-xs`}
                >
                  {badge}
                </Badge>
              )}
            </div>
            <CardDescription className={isEmpty ? 'text-gray-400' : ''}>{description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <p className={`text-sm ${isEmpty ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'} mb-2`}>{info}</p>
            {progress && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Perfil completo</span>
                  <span className="text-primary font-medium">{progress}%</span>
                </div>
                <Progress 
                  value={progress} 
                  className="h-2 bg-gray-200 dark:bg-gray-700"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="group w-full justify-between">
              {isEmpty ? 'Explorar serviços' : 'Ver detalhes'}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default HeroSection;
