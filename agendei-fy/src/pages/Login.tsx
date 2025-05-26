
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import BrandingSide from '../components/auth/BrandingSide';
import LoginForm from '../components/auth/LoginForm';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { containerVariants, itemVariants } from '../utils/animationVariations';

const Login = () => {
  const navigate = useNavigate();

  const handleSignupClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <div className="flex min-h-screen dark:bg-gray-900">
      {/* Theme Switcher */}
      <ThemeSwitcher className="fixed top-4 right-4 z-50" />
      
      {/* Branding Side */}
      <BrandingSide containerVariants={containerVariants} itemVariants={itemVariants} />

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Agendeify</h1>
            <p className="text-gray-500 dark:text-gray-400">Plataforma de agendamentos profissional</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 dark:bg-gray-800">
              <TabsTrigger value="login" className="transition-all duration-200">Entrar</TabsTrigger>
              <TabsTrigger value="signup" className="transition-all duration-200" onClick={handleSignupClick}>
                Criar conta
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
