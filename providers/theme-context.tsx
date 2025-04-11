import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export enum ThemeEnum {
  DARK = "dark",
  LIGHT = "light",
  SYSTEM = "system",
}
type ThemeContextType = {
  theme: ThemeEnum;
  setTheme: (theme: ThemeEnum) => void;
  resolvedTheme: "dark" | "light";
};

const initialState: ThemeContextType = {
  theme: ThemeEnum.SYSTEM,
  setTheme: () => null,
  resolvedTheme: "light",
};

const ThemeContext = createContext<ThemeContextType>(initialState);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeEnum>(ThemeEnum.SYSTEM);
  const systemColorScheme = useColorScheme() || "light";

  // Get resolved theme (actual theme being used - light or dark)
  const resolvedTheme = theme === "system" ? systemColorScheme : theme;

  // Load saved theme from AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("app-theme");
        if (
          savedTheme &&
          (savedTheme === "dark" ||
            savedTheme === "light" ||
            savedTheme === "system")
        ) {
          setTheme(savedTheme as ThemeEnum);
        }
      } catch (e) {
        console.error("Failed to load theme", e);
      }
    };

    loadTheme();
  }, []);

  // Save theme to AsyncStorage when it changes
  const handleSetTheme = async (newTheme: ThemeEnum) => {
    try {
      setTheme(newTheme);
      await AsyncStorage.setItem("app-theme", newTheme);
    } catch (e) {
      console.error("Failed to save theme", e);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        resolvedTheme,
      }}
    >
      <View className={`flex-1 ${resolvedTheme === "dark" ? "dark" : ""}`}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}
