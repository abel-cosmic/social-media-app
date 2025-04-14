import Logo from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/graphql/auth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const result = await login(email, password);
      if (result.success) {
        // Navigate to main app
        router.replace("/(tabs)");
      } else {
        Alert.alert("Error", result.message || "Failed to sign in");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className={`flex-1 justify-center px-8 bg-background`}>
        <View className="items-center mb-8">
          <Logo />
          <Text className={`text-3xl font-bold mt-4 text-foreground `}>
            Sign In
          </Text>
          <Text className={`text-base mt-2 text-foreground`}>
            Welcome back to Cosmic
          </Text>
        </View>

        <View className="space-y-4">
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View className="relative">
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              className="absolute right-3 top-9"
            >
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24}    color={"gray"}/>
            </TouchableOpacity>
          </View>

          <View className="items-end">
            <TouchableOpacity>
              <Text className={`text-primary`}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <Button
            variant="default"
            size="lg"
            onPress={handleSignIn}
            isLoading={isLoading}
          >
            Sign In
          </Button>

          <View className="flex-row justify-center mt-6">
            <Text className={`text-foreground`}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/sign-up")}>
              <Text className={`font-semibold text-primary`}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
