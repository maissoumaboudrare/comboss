"use client"
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchAPI } from "@/lib/utils";

type User = {
  userID?: number | undefined;
  pseudo?: string;
  avatar: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: User | null) => void;
  checkAuthStatus: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async (userId: number) => {
    try {
      const response = await fetchAPI(`/api/users/${userId}`, {
        method: "GET",
      });
      setUser(response);
    } catch (error) {
      console.error("Failed to fetch user data 😢:", error);
    }
  };

  const checkAuthStatus =  useCallback(async () => {
    try {
      const response = await fetchAPI("/api/auth/status", {
        method: "GET",
      });
      setIsAuthenticated(response.isAuthenticated);
      if (response.isAuthenticated) {
        await fetchUser(response.id);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to check authentication status 😢:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
    const intervalId = setInterval(checkAuthStatus, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [checkAuthStatus]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, setIsLoading, user, setIsAuthenticated, setUser, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};