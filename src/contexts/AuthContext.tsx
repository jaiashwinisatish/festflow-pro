import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  signup: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<UserRole, User> = {
  admin: { id: 'u1', name: 'Admin User', email: 'admin@fest.edu', role: 'admin' },
  participant: { id: 'u2', name: 'Arjun Reddy', email: 'arjun@mail.com', role: 'participant' },
  coordinator: { id: 'u3', name: 'Dr. Sharma', email: 'sharma@fest.edu', role: 'coordinator' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (_email: string, _password: string, role: UserRole) => {
    setUser(mockUsers[role]);
  };

  const signup = (name: string, email: string, _password: string, role: UserRole) => {
    setUser({ id: 'u-new', name, email, role });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
