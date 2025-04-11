import { ThemeSelector } from "@/components/custom/theme-selector";
import { useRouter } from "expo-router";
import { LogOut, User } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const { push } = useRouter();
  return (
    <ScrollView className="flex-1 bg-background pt-20">
      <View className="p-6">
        <View className="flex-row items-center mb-8">
          <View className="bg-primary p-4 rounded-full">
            <User className="text-primary" color={"white"} size={24} />
          </View>
          <View className="ml-4">
            <Text className="text-xl font-semibold text-foreground">
              John Doe
            </Text>
            <Text className="text-muted-foreground">john@example.com</Text>
          </View>
        </View>
        <View className="mb-8">
          <Text className="text-lg font-medium text-foreground mb-1">
            Appearance
          </Text>
          <Text className="text-sm text-muted-foreground mb-4">
            Choose your preferred theme
          </Text>
          <ThemeSelector />
        </View>
        <View className="mb-8">
          <TouchableOpacity
            onPress={() => {
              //@ts-ignore
              push("(auth)/sign-in");
            }}
            className="flex-row justify-center items-center gap-4 bg-primary w-full text-center flex rounded-md p-4 text-background"
          >
            <View className="flex-row justify-center items-center">
              <LogOut color={"white"} size={16} />
              <Text className="text-white ml-4">Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-lg font-medium text-foreground mb-4">
            About
          </Text>
          <View className="bg-card rounded-xl p-4">
            <View className="flex-row justify-between py-3 border-b border-border/30">
              <Text className="text-muted-foreground">Version</Text>
              <Text className="text-foreground">1.0.0</Text>
            </View>
            <View className="flex-row justify-between py-3 border-b border-border/30">
              <Text className="text-muted-foreground">Build Number</Text>
              <Text className="text-foreground">12345</Text>
            </View>
            <View className="flex-row justify-between py-3">
              <Text className="text-muted-foreground">Developer</Text>
              <Text className="text-foreground">Your Company</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
