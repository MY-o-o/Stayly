"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  User,
  LoginRequest,
  RegisterRequest,
  loginApi,
  registerApi,
  getMeApi,
  logoutApi,
  getStoredToken,
  getStoredUser,
  clearStoredToken,
  clearStoredUser,
} from "../lib/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (credentials: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      const existingToken = getStoredToken();
      if (existingToken && isMounted) {
        setToken(existingToken);
      }

      const storedUser = getStoredUser();
      if (existingToken && storedUser && isMounted) {
        setUser(storedUser);
      } else if (existingToken) try {
        const currentUser = await getMeApi();
        if (isMounted) {
          setUser(currentUser);
        }
      } catch {
        if (isMounted) {
          setUser(null);
          setToken(null);
          clearStoredToken();
          clearStoredUser();
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials: LoginRequest) => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await loginApi(credentials);
      setUser(result.user);
      if (result.token) {
        setToken(result.token);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to sign in";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterRequest) => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await registerApi(credentials);
      setUser(result.user);
      if (result.token) {
        setToken(result.token);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create account";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutApi();
    } finally {
      setUser(null);
      setToken(null);
      clearStoredToken();
      clearStoredUser();
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
