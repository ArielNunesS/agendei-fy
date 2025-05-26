/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface BrandingSideProps {
  containerVariants: any;
  itemVariants: any;
}

const BrandingSide: React.FC<BrandingSideProps> = ({ containerVariants, itemVariants }) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 hero-gradient flex-col justify-center items-center px-12 text-white relative overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="z-10 max-w-md"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl font-bold mb-4"
        >
          Seu tempo, sua agenda, seu controle.
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg mb-8 text-blue-100"
        >
          O Agendeify é sua central de agendamentos moderna, para quem leva o tempo a sério.
        </motion.p>

        <motion.ul variants={containerVariants} className="space-y-4">
          {[
            { text: "Agendamentos inteligentes e automáticos", delay: 0.1 },
            { text: "Integração com Google Calendar e Stripe", delay: 0.2 },
            { text: "Notificações por e-mail e WhatsApp", delay: 0.3 },
            { text: "Gestão de clientes com histórico completo", delay: 0.4 },
            { text: "Painel profissional com dados e insights reais", delay: 0.5 },
          ].map((item, index) => (
            <motion.li 
              key={index}
              variants={itemVariants}
              transition={{ delay: item.delay }}
              className="flex items-center"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 mr-3 bg-blue-400 bg-opacity-30 rounded-full">
                <CheckCircle className="w-4 h-4" />
              </span>
              {item.text}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-300 bg-opacity-20 rounded-full"></div>
      <div className="absolute top-20 -left-16 w-48 h-48 bg-blue-200 bg-opacity-20 rounded-full"></div>
    </div>
  );
};

export default BrandingSide;
