/**
 * Authentication Context Provider
 * Manages authentication state across the application
 * Provides login, logout, and token management functionality
 */

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/constants/Config';
import { UserProfile } from '@/models/AuthModels';

// TODO: Add token expiration checking and auto-refresh mechanism
// TODO: Implement secure storage for sensitive authentication data
// TODO: Add biometric authentication option for South African users

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: UserProfile) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: UserProfile) => Promise<void>;
  // TODO: Add methods for handling refresh tokens
  // TODO: Add method for checking token validity
  // TODO: Add two-factor authentication handling
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // TODO: Add state for token expiration time
  // TODO: Add state for refresh token

  // Load stored authentication data on startup
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const storedUserJson = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
        
        if (storedToken && storedUserJson) {
          const storedUser = JSON.parse(storedUserJson) as UserProfile;
          setToken(storedToken);
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Failed to load authentication data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  // TODO: Implement token refresh mechanism when token is about to expire

  // Store authentication data
  const login = async (newToken: string, newUser: UserProfile) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
      // TODO: Store token expiration time
      // TODO: Set up timer for token refresh
    } catch (error) {
      console.error('Failed to store authentication data:', error);
      throw error;
    }
  };

  // Clear authentication data
  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
      await AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      setToken(null);
      setUser(null);
      // TODO: Clear any refresh timers
      // TODO: Notify backend about logout for token invalidation
    } catch (error) {
      console.error('Failed to remove authentication data:', error);
      throw error;
    }
  };

  // Update user profile
  const updateUser = async (updatedUser: UserProfile) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update user data:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
