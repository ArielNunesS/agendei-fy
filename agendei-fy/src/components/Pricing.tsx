
import React from 'react';
import { Button } from "./ui/button";
import { Check, BadgeCheck, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Pricing = () => {
  const features = [
    "Agenda ilimitada",
    "Notificações por e-mail",
    "Página personalizada de agendamento",
    "Integração com calendários",
    "Relatórios e métricas",
    "Regras personalizadas de agendamento"
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary/10 to-blue-300/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-primary/10 to-indigo-300/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
            Plano simples
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            Um único plano. <span className="text-primary">Tudo</span> que você precisa.
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Sem surpresas ou taxas ocultas. Apenas uma assinatura simples com todas as funcionalidades.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto relative"
        >
          {/* Popular badge */}
          <div className="absolute top-0 inset-x-0 transform -translate-y-1/2 flex justify-center">
            <div className="bg-primary text-white text-center py-2.5 px-8 rounded-full text-sm font-bold inline-block shadow-lg flex items-center space-x-1">
              <Star className="w-4 h-4 mr-1 fill-white" />
              <span>MAIS POPULAR</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-2 border-primary relative overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            {/* Background decorative element */}
            <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 dark:bg-primary/10 rounded-full -translate-x-12 -translate-y-16"></div>
            
            <div className="text-center mb-8 relative">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 mr-2.5 text-primary" />
                <h3 className="text-2xl md:text-3xl font-bold">Plano Premium</h3>
              </div>
              <div className="mt-6 text-center">
                <span className="text-6xl md:text-7xl font-bold text-primary">R$39,99</span>
                <span className="text-gray-500 dark:text-gray-400 ml-2 text-xl">/mês</span>
              </div>
              <div className="mt-4 flex justify-center">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="bg-amber-100/80 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 px-4 py-1.5 rounded-full text-sm font-medium flex items-center shadow-sm border border-amber-200 dark:border-amber-800/30"
                >
                  <BadgeCheck className="w-4 h-4 mr-1.5 text-amber-600 dark:text-amber-400" />
                  Sem compromisso
                </motion.span>
              </div>
              <p className="mt-5 text-gray-600 dark:text-gray-300 text-lg">
                Tudo o que você precisa para gerenciar sua agenda profissional
              </p>
            </div>
            
            <div className="mt-8">
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full mr-4 flex-shrink-0 shadow-sm">
                      <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-lg">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="mt-10">
              <Link to="/signup" className="block">
                <Button className="w-full text-lg py-7 bg-primary hover:bg-primary-700 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] font-bold rounded-xl">
                  Começar agora
                </Button>
              </Link>
              <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                Teste grátis por 7 dias. Sem compromisso.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
