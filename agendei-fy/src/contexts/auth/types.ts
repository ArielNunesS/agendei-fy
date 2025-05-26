import { Session, User } from '@supabase/supabase-js';

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  user_type: 'cliente' | 'prestador' | 'admin';
  created_at?: string;
  updated_at?: string;
};

export type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, userType: 'cliente' | 'prestador') => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean | undefined>;
  updatePassword: (newPassword: string) => Promise<boolean | undefined>;
  getProfile: () => Promise<UserProfile | null>;
};
