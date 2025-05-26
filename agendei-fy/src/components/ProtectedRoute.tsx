
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: ('cliente' | 'prestador' | 'admin')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedUserTypes 
}) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se houver tipos de usuários permitidos especificados e o perfil estiver carregado
  if (allowedUserTypes && allowedUserTypes.length > 0 && profile) {
    // Verifica se o tipo de usuário atual está entre os permitidos
    if (!allowedUserTypes.includes(profile.user_type)) {
      // Redireciona para a página apropriada com base no tipo de usuário
      if (profile.user_type === 'cliente') {
        return <Navigate to="/painel-cliente" replace />;
      } else if (profile.user_type === 'prestador') {
        return <Navigate to="/dashboard" replace />;
      } else if (profile.user_type === 'admin') {
        return <Navigate to="/admin" replace />;
      }
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
