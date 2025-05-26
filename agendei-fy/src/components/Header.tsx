
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Adjust offset for header height
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`w-full py-4 px-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent'
      } ${className || ''}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center">
            <motion.h1 
              className={`text-2xl font-bold ${isScrolled ? 'text-gradient' : 'text-white'}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Agendeify
            </motion.h1>
          </Link>
        </motion.div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { name: 'Início', section: 'home' },
            { name: 'Funcionalidades', section: 'features' },
            { name: 'Preços', section: 'pricing' },
            { name: 'Contato', section: 'contact' }
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
            >
              <motion.button 
                onClick={() => scrollToSection(item.section)} 
                className={`${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white dark:text-gray-200'} text-base font-medium hover:text-primary transition-colors animated-underline`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.name}
              </motion.button>
            </motion.div>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/login">
              <Button 
                variant={isScrolled ? "outline" : "ghost"} 
                className={`${!isScrolled && 'text-white dark:text-gray-200 border-white dark:border-gray-200 hover:bg-white/10'} px-6`}
              >
                Entrar
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/signup">
              <Button className="bg-primary hover:bg-primary-600 dark:bg-primary-700 dark:hover:bg-primary-600 px-6 shadow-lg hover:shadow-primary/30">
                Cadastre-se
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <motion.button 
          className="md:hidden p-2 rounded-md focus:outline-none z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? (
            <X className={isScrolled ? 'text-gray-800' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} />
          )}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 z-40 bg-primary/95 backdrop-blur-md"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container mx-auto py-24 px-4 flex flex-col space-y-6 items-center">
              <motion.button 
                onClick={() => scrollToSection('home')} 
                className="text-white text-xl font-medium py-2 w-full text-center"
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Início
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('features')} 
                className="text-white text-xl font-medium py-2 w-full text-center"
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Funcionalidades
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('pricing')} 
                className="text-white text-xl font-medium py-2 w-full text-center"
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Preços
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('contact')} 
                className="text-white text-xl font-medium py-2 w-full text-center"
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Contato
              </motion.button>
              
              <motion.div 
                className="flex flex-col space-y-4 pt-6 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-primary">
                    Entrar
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <Button className="w-full bg-white text-primary hover:bg-gray-100">
                    Cadastre-se
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
