
import React from 'react';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';
import ModernDashboardLayout from '../components/dashboard/ModernDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const appointmentsData = [
  { name: 'Jan', total: 125 },
  { name: 'Fev', total: 140 },
  { name: 'Mar', total: 165 },
  { name: 'Abr', total: 135 },
  { name: 'Mai', total: 178 },
  { name: 'Jun', total: 156 }
];

const revenueData = [
  { name: 'Jan', total: 4500 },
  { name: 'Fev', total: 5200 },
  { name: 'Mar', total: 6100 },
  { name: 'Abr', total: 4900 },
  { name: 'Mai', total: 7200 },
  { name: 'Jun', total: 6500 }
];

const servicesPieData = [
  { name: 'Cabelo', value: 45 },
  { name: 'Unhas', value: 30 },
  { name: 'Estética', value: 15 },
  { name: 'Maquiagem', value: 10 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReportsPage: React.FC = () => {
  return (
    <ModernDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">Indicadores e análises de desempenho.</p>
        </div>
        
        <Tabs defaultValue="appointment" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="appointment" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Agendamentos
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Receita
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Serviços
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointment" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Agendamentos (6 meses)</CardTitle>
                  <CardDescription>
                    Visualização dos agendamentos realizados nos últimos 6 meses.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={appointmentsData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} agendamentos`, 'Total']}
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Agendamentos</CardTitle>
                  <CardDescription>
                    Distribuição por tipo de serviço.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={servicesPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {servicesPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value} agendamentos`, 'Quantidade']}
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="revenue" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Receita (6 meses)</CardTitle>
                <CardDescription>
                  Análise da receita mensal dos últimos 6 meses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={revenueData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`R$ ${value}`, 'Receita']}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '8px',
                          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="services" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Serviços mais procurados</CardTitle>
                  <CardDescription>
                    Ranking dos serviços com maior número de agendamentos.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={[
                          { name: 'Corte Fem.', total: 84 },
                          { name: 'Corte Masc.', total: 65 },
                          { name: 'Manicure', total: 58 },
                          { name: 'Pedicure', total: 42 },
                          { name: 'Coloração', total: 38 },
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip 
                          formatter={(value) => [`${value} agendamentos`, 'Total']}
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar dataKey="total" fill="#00C49F" radius={[0, 4, 4, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Performance dos Profissionais</CardTitle>
                  <CardDescription>
                    Número de atendimentos por profissional no mês.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={[
                          { name: 'Ana', total: 48 },
                          { name: 'Ricardo', total: 42 },
                          { name: 'Juliana', total: 38 },
                          { name: 'Marcos', total: 35 },
                          { name: 'Fernanda', total: 30 },
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} atendimentos`, 'Total']}
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar dataKey="total" fill="#FF8042" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ModernDashboardLayout>
  );
};

export default ReportsPage;
