
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Loader2, Check, AlertTriangle, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/auth';
import BrandingSide from '../components/auth/BrandingSide';
import { containerVariants, itemVariants } from '../utils/animationVariations';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { updatePassword, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    const result = await updatePassword(password);
    if (result) {
      setSuccess(true);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Branding Side */}
      <BrandingSide containerVariants={containerVariants} itemVariants={itemVariants} />

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 lg:p-12 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Link to="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o login
          </Link>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Redefinir Senha</h1>
            <p className="text-gray-600">Crie uma nova senha para sua conta</p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 p-8 rounded-xl text-center border border-green-100 shadow-sm"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">Senha Atualizada!</h2>
              <p className="text-green-700 mb-6">Sua senha foi redefinida com sucesso.</p>
              <p className="text-sm text-green-600 mb-6">Você será redirecionado para a página de login em alguns instantes...</p>
              <Link to="/login">
                <Button variant="outline" className="w-full">Ir para o login</Button>
              </Link>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-5 bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm" 
              onSubmit={handleSubmit}
            >
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 p-4 rounded-lg flex items-start gap-3 border border-red-100"
                >
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </motion.div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  Nova Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="transition-all duration-200 border-gray-200 focus:border-primary focus:ring focus:ring-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  Confirmar Nova Senha
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="transition-all duration-200 border-gray-200 focus:border-primary focus:ring focus:ring-primary/20"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-2.5 transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-md"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Redefinindo...
                  </>
                ) : (
                  'Redefinir Senha'
                )}
              </Button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
