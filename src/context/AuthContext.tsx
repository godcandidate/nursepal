import React, { createContext, useContext, useState } from 'react';
import { User, AuthContextType } from '../types';
import { mockUser } from '../data';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Mock login - in a real app, this would make an API call
    setUser(mockUser);
  };

  const signup = (name: string, email: string, password: string) => {
    // Mock signup - in a real app, this would make an API call
    setUser({
      ...mockUser,
      name,
      email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};