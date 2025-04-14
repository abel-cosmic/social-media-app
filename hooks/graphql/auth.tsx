// hooks/useAuth.ts
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { client } from "../../apollo/client";
import { REGISTER_USER, LOGIN_USER, CURRENT_USER } from "@/apollo/queries/auth";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Registration mutation
  const [registerMutation, { loading: registerLoading }] =
    useMutation(REGISTER_USER);

  // Login mutation
  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN_USER);

  // Get current user query
  const {
    data: userData,
    loading: userLoading,
    refetch: refetchUser,
  } = useQuery(CURRENT_USER, {
    skip: !isLoggedIn,
    onCompleted: (data) => {
      if (data?.currentUser) {
        setIsLoggedIn(true);
      }
    },
  });

  // Register function
  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const { data } = await registerMutation({
        variables: {
          input: { username, email, password },
        },
      });

      if (data?.register.token) {
        await AsyncStorage.setItem("auth_token", data.register.token);
        setIsLoggedIn(true);
        return { success: true, user: data.register.user };
      }
      return { success: false, error: "Registration failed" };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      if (data?.login.token) {
        await AsyncStorage.setItem("auth_token", data.login.token);
        setIsLoggedIn(true);
        return { success: true, user: data.login.user };
      }
      return { success: false, error: "Login failed" };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("auth_token");
      setIsLoggedIn(false);
      // Reset Apollo cache
      await client.resetStore();
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  // Check if user is logged in on mount
  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      if (token) {
        setIsLoggedIn(true);
        await refetchUser();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Auth check error:", error);
      return false;
    }
  };

  return {
    isLoggedIn,
    user: userData?.currentUser,
    loading: registerLoading || loginLoading || userLoading,
    register,
    login,
    logout,
    checkAuth,
  };
};
