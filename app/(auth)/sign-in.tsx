import Logo from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/providers/theme-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/(tabs)");
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      className={`flex-1 p-5 bg-background`}
    >
      <View className="flex-1 justify-center">
        <Logo />

        <View className="w-full mt-4">
          <Text
            className={`text-2xl font-bold mb-6 text-center text-foreground`}
          >
            Welcome Back
          </Text>

          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            isDark={isDark}
          />

          <View className="relative">
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              isDark={isDark}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color={isDark ? "#9ca3af" : "#6b7280"}
              />
            </TouchableOpacity>
          </View>

          <Button
            variant="default"
            isLoading={isLoading}
            onPress={handleSignIn}
            className="mt-4"
          >
            Sign In
          </Button>

          <View className="flex-row justify-center mt-6">
            <Text className={`text-foreground`}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                //@ts-ignore
                router.push("sign-up");
              }}
            >
              <Text className="text-primary font-medium">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
