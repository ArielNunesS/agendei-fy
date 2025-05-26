
import React from 'react';
import { Button } from "../components/ui/button";
import { useAuth } from '../contexts/auth/useAuth';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const { signOut, loading } = useAuth();

  return (
    <Button 
      variant="outline" 
      onClick={signOut} 
      disabled={loading}
      className={className}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Sair
    </Button>
  );
};

export default LogoutButton;
