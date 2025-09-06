import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  error: string | null;
  setAuthStatus: (status: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch("http://192.168.0.102:8000/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const status = response.status;
      const data = await response.json();
      if (status === 200) {
        await AsyncStorage.setItem("authToken", data.access_token);
      } else {
        setError(data.detail || "Login failed");
      }
      checkAuthStatus();
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, error, setAuthStatus: setIsLoggedIn, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};
