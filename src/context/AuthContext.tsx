import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '../api/api';
import type { User, AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setError(null); // Clear any previous errors
    setUser(null); // Clear any existing user data
    
    try {
      const response = await authApi.login(email, password);
      // Only set user and navigate if we get here (no error thrown)
      if (response.success) {
        setUser({ id: '', name: response.name, email });
        toast.success('Login successful');
        navigate('/dashboard');
        return; // Exit early on success
      }
      // Should not get here due to API throwing on !success
      setError('Invalid login attempt');
      toast.error('Invalid login attempt');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await authApi.register({ name, email, password });
      if (response.success) {
        setUser({ id: '', name: response.name, email });
        toast.success('Signup successful');
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Signup failed');
      toast.error(error instanceof Error ? error.message : 'Signup failed');
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};