
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { 
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "../ui/dialog";
import { useAuth } from '../../contexts/auth/useAuth';
import { handlePasswordReset } from '@/contexts/auth/authUtils';
import { Loader2, CheckCircle, AlertCircle, Mail, Lock } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState<boolean | null>(null);
  const { signIn, loading } = useAuth();
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  // Validate email as user types
  useEffect(() => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidEmail(emailRegex.test(email));
    } else {
      setValidEmail(null);
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const handleResetPassword = async () => {
    const success = await handlePasswordReset(resetEmail, setResetLoading);
    if (success) {
      setResetEmailSent(true);
      setTimeout(() => {
        setResetPasswordDialogOpen(false);
        setResetEmailSent(false);
        setResetEmail('');
      }, 3000);
    }
  };

  const openResetDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    setResetEmail(email); // Pre-fill with login email
    setResetPasswordDialogOpen(true);
  };

  return (
    <>
      <motion.form 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-5" 
        onSubmit={handleSubmit}
      >
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
            className="transition-all duration-200 border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
          />
        </div>

        <div className="flex justify-end">
          <button 
            type="button" 
            onClick={openResetDialog}
            className="text-sm text-primary hover:text-primary/80 transition-all"
          >
            Esqueceu a senha?
          </button>
        </div>
        
        <Button 
          type="submit" 
          className="w-full py-2.5 transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-md"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </Button>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Em breve</span>
          </div>
        </div>
        
        <Button 
          type="button" 
          variant="outline" 
          disabled
          className="w-full flex items-center justify-center gap-2 bg-white"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
            </g>
          </svg>
          Continuar com Google
        </Button>
      </motion.form>

      {/* Password Reset Dialog */}
      <Dialog open={resetPasswordDialogOpen} onOpenChange={setResetPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Recuperar senha</DialogTitle>
            <DialogDescription>
              {resetEmailSent 
                ? "Email enviado com sucesso! Verifique sua caixa de entrada." 
                : "Insira seu email para receber instruções de redefinição de senha."}
            </DialogDescription>
          </DialogHeader>
          
          {!resetEmailSent ? (
            <>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="reset-email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    E-mail
                  </label>
                  <Input
                    id="reset-email"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button 
                  onClick={handleResetPassword}
                  disabled={resetLoading}
                >
                  {resetLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Enviando...
                    </>
                  ) : (
                    'Enviar instruções'
                  )}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="flex items-center justify-center py-6">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginForm;
