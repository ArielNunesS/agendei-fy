
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="w-full hero-gradient dark:from-gray-900 dark:to-gray-800 min-h-[80vh] md:min-h-screen flex items-center">
      <div className="container mx-auto py-16 md:py-24 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-white"
          >
            <motion.div variants={itemVariants} className="mb-3 inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="text-sm font-medium">Nova plataforma de agendamentos</span>
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight"
            >
              Simplifique seus <span className="bg-white text-primary dark:bg-gray-900 dark:text-primary-300 px-2 italic rounded">agendamentos</span> e cresça seu negócio
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl opacity-90 mb-8 max-w-xl"
            >
              Agendeify é a solução completa para gerenciar agendamentos, clientes e pagamentos em um só lugar. Ideal para salões, clínicas e serviços diversos.
            </motion.p>
            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap gap-4"
            >
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-gray-100 text-primary dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-primary-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  Comece Agora
                </Button>
              </Link>
              <Link to="/portal-cliente">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-white border-white hover:bg-white/20 dark:text-gray-200 dark:border-gray-200 dark:hover:bg-gray-800"
                >
                  Ver Demonstração <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <p className="text-sm opacity-80">Confiado por diversas empresas:</p>
              <div className="flex flex-wrap gap-8">
                <img src="https://placehold.co/90x30/ffffff/808080?text=LOGO" className="h-6 opacity-70 hover:opacity-100 transition-opacity" alt="Company logo" />
                <img src="https://placehold.co/90x30/ffffff/808080?text=LOGO" className="h-6 opacity-70 hover:opacity-100 transition-opacity" alt="Company logo" />
                <img src="https://placehold.co/90x30/ffffff/808080?text=LOGO" className="h-6 opacity-70 hover:opacity-100 transition-opacity" alt="Company logo" />
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-xl rounded-full"></div>
              <div className="bg-white dark:bg-gray-900 p-2 rounded-xl shadow-2xl relative transform hover:-rotate-1 hover:scale-105 transition-transform duration-500 z-10">
                <img 
                  src="https://placehold.co/600x400/4169E1/FFFFFF?text=Agendeify+App" 
                  alt="App screenshot" 
                  className="rounded-lg"
                  width={550}
                  height={400}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-20 transform rotate-3 hover:rotate-0 transition-transform">
                <div className="text-primary dark:text-primary-300 font-semibold">+200%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Produtividade</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
