
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from '../../components/ui/card';
import { Clock, ChevronRight, Star } from 'lucide-react';
import { Scissors, HandHeart, Leaf } from '@/components/icons/CustomIcons';
import { Sparkles } from 'lucide-react';
import { containerVariants, itemVariants } from '../../utils/animationVariations';
import { Badge } from '../../components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip';

const ServicesSection = () => {
  return (
    <TooltipProvider>
      <div className="py-16 md:py-24 bg-gray-50/80 dark:bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Serviços
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">Serviços Populares</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore os serviços mais procurados pelos nossos clientes
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 max-w-6xl mx-auto"
          >
            {services.map((service, idx) => (
              <ServiceCard key={idx} service={service} index={idx} />
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button className="bg-primary hover:bg-primary-600 text-white px-8">
              Ver Todos os Serviços
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

interface Service {
  title: string;
  desc: string;
  fullDesc: string;
  icon: React.ReactNode;
  time: string;
  price: string;
  originalPrice?: string;
  popular?: boolean;
  promotion?: boolean;
  rating: number;
  slug: string;
}

const services: Service[] = [
  {
    title: "Corte de Cabelo",
    desc: "Estilo personalizado para realçar sua beleza",
    fullDesc: "Corte moderno e personalizado com lavagem, condicionamento e finalização profissional. Inclui consulta de estilo.",
    icon: <Scissors className="h-10 w-10 text-primary" />,
    time: "45 min",
    price: "R$ 75",
    popular: true,
    rating: 4.8,
    slug: "corte-cabelo"
  },
  {
    title: "Massagem Relaxante",
    desc: "Alívio do estresse e bem-estar garantido",
    fullDesc: "Massagem terapêutica completa com óleos essenciais para relaxamento profundo e alívio de tensões musculares.",
    icon: <HandHeart className="h-10 w-10 text-indigo-500" />,
    time: "60 min",
    price: "R$ 90",
    originalPrice: "R$ 120",
    promotion: true,
    rating: 4.9,
    slug: "massagem-relaxante"
  },
  {
    title: "Manicure & Pedicure",
    desc: "Unhas impecáveis e cuidados completos",
    fullDesc: "Tratamento completo das unhas das mãos e pés com esmaltação, hidratação e cuidados especiais.",
    icon: <Sparkles className="h-10 w-10 text-pink-500" />,
    time: "90 min",
    price: "R$ 85",
    popular: true,
    rating: 4.7,
    slug: "manicure-pedicure"
  },
  {
    title: "Limpeza de Pele",
    desc: "Renovação e hidratação profunda",
    fullDesc: "Limpeza facial profunda com extração, esfoliação, máscara hidratante e proteção solar.",
    icon: <Leaf className="h-10 w-10 text-green-500" />,
    time: "60 min",
    price: "R$ 110",
    rating: 4.6,
    slug: "limpeza-pele"
  }
];

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const handleBooking = () => {
    // Navegar para página de agendamento do serviço
    window.location.href = `/servico/${service.slug}`;
  };

  return (
    <motion.div 
      variants={itemVariants}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="h-full border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:-translate-y-2 bg-white dark:bg-gray-800 cursor-pointer">
            <div className="relative">
              {service.popular && (
                <div className="absolute top-2 right-2 z-10">
                  <Badge className="bg-primary">Popular</Badge>
                </div>
              )}
              {service.promotion && (
                <div className="absolute top-2 left-2 z-10">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">Promoção</Badge>
                </div>
              )}
              <div className="pt-6 pb-3 px-6 flex justify-center">
                <motion.div 
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.icon}
                </motion.div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{service.title}</h3>
                <div className="flex items-center text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{service.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-5">{service.desc}</p>
              
              <div className="flex justify-between items-center text-sm border-t pt-4 border-dashed border-gray-200 dark:border-gray-700">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                  </motion.div>
                  <span>{service.time}</span>
                </div>
                <div className="text-right">
                  {service.originalPrice && (
                    <div className="text-xs text-gray-400 line-through">{service.originalPrice}</div>
                  )}
                  <div className="font-bold text-primary text-lg">{service.price}</div>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full mt-4 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                onClick={handleBooking}
              >
                Agendar
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{service.fullDesc}</p>
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
};

export default ServicesSection;
