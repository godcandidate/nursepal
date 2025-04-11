import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '../api/api';
import type { User, AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setError(null); // Clear any previous errors
    setUser(null); // Clear any existing user data
    
    try {
      const response = await authApi.login(email, password);
      if (response.success) {
        const userData = { id: '', name: response.name, email };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('Login successful');
        return true; // Return success so the component can handle navigation
      }
      throw new Error('Invalid login attempt');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setError(null);
    try {
      const response = await authApi.register({ name, email, password });
      if (response.success) {
        const userData = { id: '', name: response.name, email };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('Signup successful');
        return true;
      }
      throw new Error('Signup failed');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};