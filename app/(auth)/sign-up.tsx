import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/providers/theme-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/custom/logo";

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to home on successful registration
      router.replace("/(tabs)");
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`flex-1 bg-background`}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1 p-5"
      >
        <View className="flex-1 justify-center">
          <Logo />

          <View className="w-full mt-4">
            <Text
              className={`text-2xl font-bold mb-6 text-center text-foreground`}
            >
              Create Account
            </Text>

            <Input
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              isDark={isDark}
            />

            <Input
              label="Email"
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
                className="pr-10"
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

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              isDark={isDark}
            />

            <Button
              variant="default"
              isLoading={isLoading}
              onPress={handleSignUp}
              className="mt-2"
            >
              Sign Up
            </Button>

            <View className="flex-row justify-center mt-6">
              <Text className={"text-foreground"}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  //@ts-ignore
                  router.push("sign-in");
                }}
              >
                <Text className="text-primary font-medium">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
