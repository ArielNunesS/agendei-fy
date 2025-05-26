
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Bell, Award, Clock, Calendar, Shield } from 'lucide-react';
import { containerVariants, itemVariants } from '../../utils/animationVariations';

const FeaturesSection = () => {
  return (
    <div className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
            Recursos exclusivos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
            Por que escolher nossos serviços?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Nossa plataforma oferece tudo o que você precisa para uma experiência excepcional
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 max-w-6xl mx-auto"
        >
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} index={idx} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

interface Feature {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

const features: Feature[] = [
  {
    title: "Agendamento Rápido",
    desc: "Agende seus serviços em poucos cliques, sem complicação",
    icon: <Calendar className="h-8 w-8" />,
    color: "text-blue-500 dark:text-blue-400"
  },
  {
    title: "Lembretes Automáticos",
    desc: "Receba notificações antes dos seus compromissos",
    icon: <Bell className="h-8 w-8" />,
    color: "text-red-500 dark:text-red-400"
  },
  {
    title: "Profissionais Qualificados",
    desc: "Equipe especializada com anos de experiência",
    icon: <Award className="h-8 w-8" />,
    color: "text-amber-500 dark:text-amber-400"
  },
  {
    title: "Horários Flexíveis",
    desc: "Encontre o melhor horário para sua agenda",
    icon: <Clock className="h-8 w-8" />,
    color: "text-green-500 dark:text-green-400"
  },
  {
    title: "Pagamentos Seguros",
    desc: "Transações protegidas e múltiplas formas de pagamento",
    icon: <Shield className="h-8 w-8" />,
    color: "text-purple-500 dark:text-purple-400"
  },
  {
    title: "Atendimento Rápido",
    desc: "Suporte ágil para resolver suas dúvidas",
    icon: <Zap className="h-8 w-8" />,
    color: "text-indigo-500 dark:text-indigo-400"
  }
];

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  return (
    <motion.div 
      variants={itemVariants}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex gap-5 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 h-full">
        <div className="flex-shrink-0">
          <div className={`p-3 bg-gray-50 dark:bg-gray-700 rounded-lg ${feature.color}`}>
            {feature.icon}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturesSection;
