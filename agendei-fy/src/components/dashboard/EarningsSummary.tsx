
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

interface EarningsSummaryProps {
  weeklyEarnings: number;
  monthlyEarnings: number;
}

const EarningsSummary: React.FC<EarningsSummaryProps> = ({
  weeklyEarnings,
  monthlyEarnings
}) => {
  // Animation state
  const [animatedWeekly, setAnimatedWeekly] = useState(0);
  const [animatedMonthly, setAnimatedMonthly] = useState(0);
  const [targetAmount, setTargetAmount] = useState(5000); // Meta padrão
  const progressPercentage = Math.min((monthlyEarnings / targetAmount) * 100, 100);

  // Format currency as BRL
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  // Animate earnings values on component mount
  useEffect(() => {
    const duration = 1500;
    const weekllyInterval = 20;
    const weeklyIncrement = weeklyEarnings / (duration / weekllyInterval);
    const monthlyIncrement = monthlyEarnings / (duration / weekllyInterval);
    
    let currentWeekly = 0;
    let currentMonthly = 0;
    
    const timer = setInterval(() => {
      currentWeekly += weeklyIncrement;
      currentMonthly += monthlyIncrement;
      
      if (currentWeekly >= weeklyEarnings) {
        currentWeekly = weeklyEarnings;
      }
      
      if (currentMonthly >= monthlyEarnings) {
        currentMonthly = monthlyEarnings;
        clearInterval(timer);
      }
      
      setAnimatedWeekly(currentWeekly);
      setAnimatedMonthly(currentMonthly);
    }, weekllyInterval);
    
    return () => clearInterval(timer);
  }, [weeklyEarnings, monthlyEarnings]);

  return (
    <Card className="transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
      <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
          <TrendingUp className="h-5 w-5 text-primary dark:text-primary-300 mr-2" />
          Ganhos & Metas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 transition-all duration-300 hover:shadow-md"
            whileHover={{ y: -3 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-blue-700 dark:text-blue-400 font-medium flex items-center">
              Semana <ArrowUpRight className="h-3 w-3 ml-1" />
            </p>
            <p className="text-xl font-bold text-blue-800 dark:text-blue-300">{formatCurrency(animatedWeekly)}</p>
          </motion.div>
          <motion.div 
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-100 dark:border-green-800 transition-all duration-300 hover:shadow-md"
            whileHover={{ y: -3 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-sm text-green-700 dark:text-green-400 font-medium flex items-center">
              Mês <ArrowUpRight className="h-3 w-3 ml-1" />
            </p>
            <p className="text-xl font-bold text-green-800 dark:text-green-300">{formatCurrency(animatedMonthly)}</p>
          </motion.div>
        </div>

        <motion.div 
          className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Meta mensal</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatCurrency(targetAmount)}</span>
          </div>
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-primary to-primary-700 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            ></motion.div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatCurrency(monthlyEarnings)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default EarningsSummary;
