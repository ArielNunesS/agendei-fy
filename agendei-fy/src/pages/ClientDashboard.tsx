
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/auth';
import { Loader2 } from 'lucide-react';

const ClientDashboard = () => {
  const { profile, loading, getProfile } = useAuth();
  
  useEffect(() => {
    if (!profile) {
      getProfile();
    }
  }, [profile, getProfile]);

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Painel do Cliente</h1>
      <p>Bem-vindo(a), {profile.name}!</p>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Seus Agendamentos</h2>
        <p>Você não tem nenhum agendamento ainda.</p>
        {/* Aqui virá a lista de agendamentos do cliente */}
      </div>
    </div>
  );
};

export default ClientDashboard;
