import { useState, useEffect } from "react";
import { useMutation, useQuery, ApolloClient } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { client } from "@/apollo/client";
import { REGISTER_USER, LOGIN_USER, CURRENT_USER } from "@/apollo/queries/auth";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [registerMutation] = useMutation(REGISTER_USER);
  const [loginMutation] = useMutation(LOGIN_USER);
  const { data: userData, refetch } = useQuery(CURRENT_USER, {
    skip: !isAuthenticated,
    onCompleted: (data) => {
      if (data?.currentUser) {
        setUser(data.currentUser);
      }
    },
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const { data } = await registerMutation({
        variables: { input: { username, email, password } },
      });

      if (data?.register?.token) {
        await AsyncStorage.setItem("authToken", data.register.token);
        setIsAuthenticated(true);
        await refetch();
        return { success: true };
      }
      return { success: false, message: "Registration failed" };
    } catch (error) {
      console.error("Register error:", error);
      return {
        success: false,
        message: error.message || "Registration failed",
      };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: { input: { email, password } },
      });

      if (data?.login?.token) {
        await AsyncStorage.setItem("authToken", data.login.token);
        setIsAuthenticated(true);
        await refetch();
        return { success: true };
      }
      return { success: false, message: "Login failed" };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.message || "Login failed",
      };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      // Reset Apollo store to clear cached queries
      await client.resetStore();
      setIsAuthenticated(false);
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, message: "Logout failed" };
    }
  };

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setIsAuthenticated(true);
        await refetch();
      }
    } catch (error) {
      console.error("Check auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    register,
    login,
    logout,
    checkAuth,
  };
};