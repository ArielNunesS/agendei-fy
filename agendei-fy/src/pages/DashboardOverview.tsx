
import React from 'react';
import { 
  Calendar, 
  Users, 
  Briefcase, 
  UserCheck, 
  BarChart3, 
  Clock, 
  Settings,
  Plus,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ModernDashboardLayout from '../components/dashboard/ModernDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

const DashboardOverview: React.FC = () => {
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
      transition: { duration: 0.3 }
    }
  };

  return (
    <ModernDashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Bem-vindo ao seu painel de controle</p>
          </div>
          <Button className="shrink-0">
            <Plus className="mr-2" size={16} />
            Novo Agendamento
          </Button>
        </div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Agendamentos Hoje</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Clientes</p>
                    <p className="text-2xl font-bold">284</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Receita Mensal</p>
                    <p className="text-2xl font-bold">R$ 15.2k</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Profissionais Ativos</p>
                    <p className="text-2xl font-bold">6</p>
                  </div>
                  <UserCheck className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Agenda Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Agenda de Hoje
                  </CardTitle>
                  <CardDescription>Próximos compromissos</CardDescription>
                </div>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    Ver Agenda <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { time: '09:00', client: 'Maria Silva', service: 'Corte + Escova', professional: 'Ana' },
                  { time: '10:30', client: 'João Santos', service: 'Barba', professional: 'Ricardo' },
                  { time: '14:00', client: 'Carla Oliveira', service: 'Manicure', professional: 'Juliana' },
                  { time: '15:30', client: 'Pedro Costa', service: 'Corte Masculino', professional: 'Ricardo' },
                ].map((appointment, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="text-sm font-medium text-primary min-w-[50px]">
                      {appointment.time}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{appointment.client}</p>
                      <p className="text-sm text-muted-foreground">{appointment.service} • {appointment.professional}</p>
                    </div>
                    <Badge variant="outline">Confirmado</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Profissionais Section */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Profissionais
                  </CardTitle>
                  <CardDescription>Status da equipe</CardDescription>
                </div>
                <Link to="/professionals">
                  <Button variant="outline" size="sm">
                    Ver Todos <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Ana Paula', specialty: 'Cabeleireira', available: true, avatar: 'https://i.pravatar.cc/150?img=1' },
                  { name: 'Ricardo Gomes', specialty: 'Barbeiro', available: true, avatar: 'https://i.pravatar.cc/150?img=3' },
                  { name: 'Juliana Costa', specialty: 'Manicure', available: false, avatar: 'https://i.pravatar.cc/150?img=5' },
                  { name: 'Marcos Silva', specialty: 'Esteticista', available: true, avatar: 'https://i.pravatar.cc/150?img=8' },
                ].map((professional, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={professional.avatar} alt={professional.name} />
                      <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{professional.name}</p>
                      <p className="text-sm text-muted-foreground">{professional.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {professional.available ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Clientes */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Clientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">284</p>
                <p className="text-sm text-muted-foreground mb-4">Total de clientes cadastrados</p>
                <Link to="/clients">
                  <Button variant="outline" size="sm" className="w-full">
                    Gerenciar Clientes
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Serviços */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Serviços
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">18</p>
                <p className="text-sm text-muted-foreground mb-4">Serviços disponíveis</p>
                <Link to="/services">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Serviços
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Relatórios */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Relatórios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">+12%</p>
                <p className="text-sm text-muted-foreground mb-4">Crescimento no mês</p>
                <Link to="/reports">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Relatórios
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Configurações */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configurações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Personalize sua experiência</p>
                <Link to="/settings">
                  <Button variant="outline" size="sm" className="w-full">
                    Acessar Configurações
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </ModernDashboardLayout>
  );
};

export default DashboardOverview;
