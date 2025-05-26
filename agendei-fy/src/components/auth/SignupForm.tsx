import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, AlertCircle, CheckCircle, Mail, Lock, User } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from '../../contexts/auth/useAuth';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'cliente' | 'prestador'>('prestador');
  const [validEmail, setValidEmail] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  const { signUp, loading } = useAuth();

  // Validate email as user types
  useEffect(() => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidEmail(emailRegex.test(email));
    } else {
      setValidEmail(null);
    }
  }, [email]);

  // Check password strength
  useEffect(() => {
    if (password) {
      if (password.length < 6) {
        setPasswordStrength('weak');
      } else if (password.length < 10) {
        setPasswordStrength('medium');
      } else {
        setPasswordStrength('strong');
      }
    } else {
      setPasswordStrength(null);
    }
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(email, password, name, userType);
  };

  // Password strength color
  const strengthColor = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
  };

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-5" 
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          Nome completo
        </label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          required
          className="transition-all duration-200 border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          E-mail
        </label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            className="pr-10 transition-all duration-200 border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
          />
          {validEmail !== null && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {validEmail ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
            </motion.span>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Lock className="w-4 h-4 text-gray-500" />
          Senha
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          minLength={6}
          className="transition-all duration-200 border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
        />
        
        {/* Password strength indicator */}
        {passwordStrength && (
          <div className="mt-1">
            <div className="flex h-1 overflow-hidden bg-gray-200 rounded">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ 
                  width: passwordStrength === 'weak' ? '33.3%' : 
                        passwordStrength === 'medium' ? '66.6%' : '100%' 
                }}
                className={`${strengthColor[passwordStrength]}`}
              />
            </div>
            <p className="text-xs mt-1 text-gray-600">
              {passwordStrength === 'weak' && 'Senha fraca'}
              {passwordStrength === 'medium' && 'Senha média'}
              {passwordStrength === 'strong' && 'Senha forte'}
            </p>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">
          Tipo de conta
        </label>
        <RadioGroup 
          value={userType} 
          onValueChange={(value) => setUserType(value as 'cliente' | 'prestador')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cliente" id="cliente" />
            <Label htmlFor="cliente" className="cursor-pointer">Cliente</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="prestador" id="prestador" />
            <Label htmlFor="prestador" className="cursor-pointer">Prestador de serviço</Label>
          </div>
        </RadioGroup>
      </div>

      <Button 
        type="submit" 
        className="w-full py-2.5 mt-4 transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-md"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
            Cadastrando...
          </>
        ) : (
          'Cadastrar'
        )}
      </Button>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        Ao se cadastrar, você concorda com nossos 
        <a href="#" className="text-primary hover:underline"> Termos de Serviço</a> e 
        <a href="#" className="text-primary hover:underline"> Política de Privacidade</a>.
      </p>
    </motion.form>
  );
};

export default SignupForm;
