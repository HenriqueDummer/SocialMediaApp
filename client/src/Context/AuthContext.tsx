// auth-context.tsx
import { createContext, useContext, PropsWithChildren } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { UserType } from '../types/types';
import { getMe, type ApiResponse,  } from '../utils/http';

type AuthContextType = {
  authUser: UserType | undefined;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data: { data: authUser } = {} as ApiResponse<UserType>, isLoading } =
    useQuery<ApiResponse<UserType>>({
      queryKey: ['authUser'],
      queryFn: getMe,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });

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