
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface ChartData {
  name: string;
  agendamentos: number;
}

interface AppointmentChartProps {
  weeklyData: ChartData[];
  occupancyData: { name: string; value: number }[];
}

const AppointmentChart: React.FC<AppointmentChartProps> = ({
  weeklyData,
  occupancyData
}) => {
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
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const COLORS = ['#4169E1', '#E5E7EB'];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-7 gap-6"
    >
      <motion.div variants={itemVariants} className="lg:col-span-5">
        <Card className="shadow-md border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Agendamentos da Semana</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-80 w-full min-h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      border: '1px solid #E5E7EB'
                    }}
                    cursor={{ fill: 'rgba(65, 105, 225, 0.1)' }}
                  />
                  <Bar dataKey="agendamentos" fill="#4169E1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="lg:col-span-2">
        <Card className="shadow-md border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Ocupação de Horários</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-64 w-full min-h-[200px] flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={occupancyData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                      const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
                      const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                      const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#888"
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          fontSize={12}
                        >
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend 
                    verticalAlign="bottom" 
                    align="center" 
                    layout="horizontal" 
                    iconSize={10}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              Taxa de ocupação: {Math.round((occupancyData[0].value / (occupancyData[0].value + occupancyData[1].value)) * 100)}%
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AppointmentChart;
