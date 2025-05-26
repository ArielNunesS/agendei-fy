import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import supabase from '../../integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { UserProfile, AuthContextType } from '../auth/types';
import { fetchUserProfile, handleSignIn, handleSignUp, handleSignOut, handlePasswordReset, handleUpdatePassword } from '../auth/authUtils';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN' && session?.user) {
          // Fetch profile using setTimeout to prevent potential deadlock
          setTimeout(() => {
            fetchUserProfile(session.user.id).then(profile => {
              if (profile) setProfile(profile);
            });
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
        } else if (event === 'PASSWORD_RECOVERY') {
          // Tratar o evento de recuperação de senha
          console.log("PASSWORD_RECOVERY event triggered");
          navigate('/reset-password');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id).then(profile => {
          if (profile) setProfile(profile);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const getProfile = async () => {
    if (!user) return null;
    
    if (profile) return profile;
    
    return await fetchUserProfile(user.id);
  };

  const signIn = async (email: string, password: string) => {
    await handleSignIn(email, password, navigate, setLoading, setProfile);
  };

  const signUp = async (email: string, password: string, name: string, userType: 'cliente' | 'prestador') => {
    await handleSignUp(email, password, name, userType, navigate, setLoading);
  };

  const signOut = async () => {
    await handleSignOut(navigate, setLoading);
  };

  const resetPassword = async (email: string) => {
    return await handlePasswordReset(email, setLoading);
  };
  
  const updatePassword = async (newPassword: string) => {
    return await handleUpdatePassword(newPassword, navigate, setLoading);
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    getProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
