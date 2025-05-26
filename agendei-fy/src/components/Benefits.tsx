
import React from 'react';
import { CalendarClock, Clock, Users, LineChart, Mail, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Benefits = () => {
  const benefits = [
    {
      title: "Agendamento 24/7",
      description: "Seus clientes podem marcar em qualquer horário, mesmo quando você está ocupado ou fora do expediente.",
      icon: <CalendarClock className="h-10 w-10 text-primary transition-all duration-500 group-hover:scale-125 group-hover:rotate-6" />,
    },
    {
      title: "Mais produtividade",
      description: "Economize tempo eliminando as idas e vindas de telefonemas e mensagens para agendar compromissos.",
      icon: <Clock className="h-10 w-10 text-primary transition-all duration-500 group-hover:scale-125 group-hover:rotate-6" />,
    },
    {
      title: "Retenção de clientes",
      description: "Lembretes automatizados reduzem faltas e aumentam a satisfação dos seus clientes.",
      icon: <Users className="h-10 w-10 text-primary transition-all duration-500 group-hover:scale-125 group-hover:rotate-6" />,
    },
    {
      title: "Dados e análises",
      description: "Obtenha insights valiosos sobre seu negócio através de relatórios detalhados.",
      icon: <LineChart className="h-10 w-10 text-primary transition-all duration-500 group-hover:scale-125 group-hover:rotate-6" />,
    },
    {
      title: "Notificações automáticas",
      description: "E-mails e lembretes personalizados para você e seus clientes, reduzindo faltas.",
      icon: <Mail className="h-10 w-10 text-primary transition-all duration-500 group-hover:scale-125 group-hover:rotate-6" />,
    },
    {
      title: "Página personalizada",
      description: "Tenha sua própria página de agendamento para compartilhar com seus clientes.",
      icon: <Globe className="h-10 w-10 text-primary transition-all duration-500 group-hover:scale-125 group-hover:rotate-6" />,
    },
  ];

  // Reordenando os benefícios conforme solicitado
  benefits.sort((a, b) => {
    const order = ["Agendamento 24/7", "Mais produtividade", "Retenção de clientes"];
    const indexA = order.indexOf(a.title);
    const indexB = order.indexOf(b.title);
    
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
            Recursos exclusivos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
            Como o Agendeify melhora seu dia a dia
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Nossa plataforma foi desenvolvida para facilitar a gestão da sua agenda e proporcionar a melhor experiência para seus clientes.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-8 transition-all hover:shadow-lg hover:-translate-y-1 duration-300 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="mb-5 p-3 bg-white dark:bg-gray-700 rounded-xl inline-block overflow-hidden shadow-sm">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
