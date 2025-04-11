import { useTheme } from "@/providers/theme-context";
import { Moon, Sun } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ThemeEnum } from "@/providers/theme-context";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: ThemeEnum.LIGHT, label: "Light", icon: Sun },
    { id: ThemeEnum.DARK, label: "Dark", icon: Moon },
  ];

  const isDarkTheme = theme === ThemeEnum.DARK;

  return (
    <View className="flex-row justify-between mt-2">
      {themes.map(({ id, label, icon: Icon }) => {
        const isSelected = theme === id;

        // All icons white in dark theme, otherwise black when not selected
        const iconColor = isDarkTheme ? "#fff" : isSelected ? "#fff" : "#000";

        return (
          <TouchableOpacity
            key={id}
            onPress={() => setTheme(id)}
            className={`flex-1 mx-1 py-3 rounded-lg items-center ${
              isSelected ? "bg-primary" : "bg-secondary"
            } ${!isDarkTheme ? "border border-zinc-300" : ""}`}
          >
            <Icon size={20} color={iconColor} />
            <Text
              className={`mt-1 text-sm font-medium ${
                isSelected
                  ? "text-primary-foreground"
                  : isDarkTheme
                    ? "text-white"
                    : "text-black"
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
