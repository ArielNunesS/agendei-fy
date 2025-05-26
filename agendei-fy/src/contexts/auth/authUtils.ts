/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { User } from '@supabase/supabase-js';
import { supabase } from '../../integrations/supabase/client';
import { UserProfile } from '../auth/types';
import { toast } from '../../components/ui/sonner';

export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    if (data) {
      return data as UserProfile;
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return null;
};

export const handleAuthRedirect = (userType: string, navigate: Function) => {
  if (userType === 'cliente') {
    navigate('/painel-cliente');
  } else if (userType === 'prestador') {
    navigate('/dashboard');
  } else if (userType === 'admin') {
    navigate('/admin');
  }
};

export const handleSignIn = async (
  email: string, 
  password: string, 
  navigate: Function,
  setLoading: (loading: boolean) => void,
  setProfile: (profile: UserProfile | null) => void
) => {
  try {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      toast.error('Erro ao fazer login: ' + error.message);
      return;
    }
    
    if (data?.user) {
      const userProfile = await fetchUserProfile(data.user.id);
      if (userProfile) {
        setProfile(userProfile);
        handleAuthRedirect(userProfile.user_type, navigate);
        toast.success('Login realizado com sucesso!');
      }
    }
  } catch (error) {
    console.error('Erro no login:', error);
    toast.error('Ocorreu um erro durante o login');
  } finally {
    setLoading(false);
  }
};

export const handleSignUp = async (
  email: string, 
  password: string, 
  name: string, 
  userType: 'cliente' | 'prestador',
  navigate: Function,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          name,
          user_type: userType
        },
      }
    });
    
    if (error) {
      toast.error('Erro ao criar conta: ' + error.message);
      return;
    }
    
    if (data?.user) {
      // Update the user_type in the profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ user_type: userType })
        .eq('id', data.user.id);
        
      if (updateError) {
        console.error('Erro ao atualizar tipo de usuário:', updateError);
      }
      
      toast.success('Conta criada com sucesso! Faça login para continuar.');
      navigate('/login');
    }
  } catch (error) {
    console.error('Erro no cadastro:', error);
    toast.error('Ocorreu um erro durante o cadastro');
  } finally {
    setLoading(false);
  }
};

export const handleSignOut = async (
  navigate: Function,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Erro ao sair: ' + error.message);
      return;
    }
    
    navigate('/');
    toast.success('Você saiu da sua conta');
  } catch (error) {
    console.error('Erro ao sair:', error);
    toast.error('Ocorreu um erro ao sair');
  } finally {
    setLoading(false);
  }
};

export const handlePasswordReset = async (
  email: string,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    // Modifique isso para usar a URL completa atual como base para redirecionamento
    const origin = window.location.origin;
    const redirectTo = `${origin}/login`;
    
    console.log("Sending password reset to:", email);
    console.log("Redirect URL:", redirectTo);
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo,
    });
    
    if (error) {
      console.error("Password reset error:", error);
      toast.error('Erro ao enviar email de redefinição: ' + error.message);
      return false;
    }
    
    toast.success('Email de redefinição de senha enviado com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao solicitar redefinição de senha:', error);
    toast.error('Ocorreu um erro ao solicitar redefinição de senha');
    return false;
  } finally {
    setLoading(false);
  }
};

// Adicionar nova função para manipular a atualização de senha
export const handleUpdatePassword = async (
  newPassword: string,
  navigate: Function,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) {
      console.error("Update password error:", error);
      toast.error('Erro ao atualizar senha: ' + error.message);
      return false;
    }
    
    toast.success('Senha atualizada com sucesso!');
    // Após alguns segundos, redirecionar para a página de login
    setTimeout(() => {
      navigate('/login');
    }, 2000);
    return true;
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    toast.error('Ocorreu um erro ao atualizar sua senha');
    return false;
  } finally {
    setLoading(false);
  }
};
