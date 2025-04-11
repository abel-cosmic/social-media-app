import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/providers/theme-context";

export default function TabLayout() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? "#0c0a09" : "#ffffff",
          borderTopColor: isDark ? "#27272a" : "#e5e7eb",
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#D97706",
        tabBarInactiveTintColor: isDark ? "#9ca3af" : "#6b7280",
        headerStyle: {
          backgroundColor: isDark ? "#D97706" : "#D97706",
        },
        headerTintColor: isDark ? "#f9fafb" : "#0c0a09",
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
