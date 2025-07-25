import { createContext, useContext, PropsWithChildren } from 'react';
import type { UserType } from '../types/types';
import { useGetMe } from '../hooks/useGetMe';

type AuthContextType = {
  authUser: UserType | undefined;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { authUser, isLoading } = useGetMe();

  return (
    <AuthContext.Provider value={{ authUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};