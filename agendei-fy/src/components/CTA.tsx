
import React from 'react';
import { Button } from "../components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-indigo-600/80 dark:from-primary/90 dark:to-indigo-700/90"></div>
      
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 bg-white/20 text-white rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              Comece hoje
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Transforme sua agenda e impulsione seu negócio
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Junte-se aos milhares de profissionais que já economizam tempo e aumentaram seus lucros com o Agendeify.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-gray-100 text-primary dark:bg-white dark:hover:bg-gray-100 dark:text-primary-600 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-medium px-8 py-6 text-base"
                >
                  Comece sua versão gratuita
                </Button>
              </Link>
              <Link to="/#pricing">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/20 dark:border-white dark:text-white dark:hover:bg-white/20 font-medium px-8 py-6 text-base"
                >
                  Ver planos e preços <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <p className="mt-6 text-sm text-white/80">Não é necessário cartão de crédito</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
