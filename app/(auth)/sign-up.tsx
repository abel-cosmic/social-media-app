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
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSignUp = async () => {
    // Validation
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);
      const result = await register(username, email, password);

      if (result.success) {
        // Navigate to main app
        router.replace("/(tabs)");
      } else {
        Alert.alert("Error", result.message || "Failed to sign up");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className={`flex-1 justify-center px-8 py-12 text-foreground`}>
          <View className="items-center mb-8">
            <Logo />
            <Text className={`text-3xl font-bold mt-4 text-foreground`}>
              Create Account
            </Text>
          </View>

          <View className="space-y-4">
            <Input
              label="Username"
              placeholder="Choose a username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
                 />

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
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={toggleShowPassword}
                className="absolute right-3 top-9"
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color={"gray"}
                />
              </TouchableOpacity>
            </View>

            <View className="relative">
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={toggleShowConfirmPassword}
                className="absolute right-3 top-9"
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={24}
                  color={"gray"}
                />
              </TouchableOpacity>
            </View>

            <Button
              variant="default"
              size="lg"
              onPress={handleSignUp}
              isLoading={isLoading}
           >
              Sign Up
            </Button>

            <View className="flex-row justify-center mt-6">
              <Text className={`text-foreground`}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/sign-in")}>
                <Text
                  className={`font-semibold text-primary`}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
