import { ThemeProvider, useTheme } from "@/providers/theme-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import "react-native-reanimated";
import "../global.css";
//@ts-ignore
import logo from "@/assets/logo.png"; // Make sure this path is correct

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(auth)/sign-up",
};

// Custom Splash Screen Component
function CustomSplashScreen() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDark ? "#0c0a09" : "#ffffff",
      }}
    >
      <Image
        source={logo}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible
        await SplashScreen.preventAutoHideAsync();

        // Simulate loading (replace with actual async tasks if needed)
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Set app as ready
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded || !appIsReady) {
    return <CustomSplashScreen />;
  }

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { resolvedTheme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: resolvedTheme === "dark" ? "#0c0a09" : "#ffffff",
        },
        headerTintColor: resolvedTheme === "dark" ? "#f9fafb" : "#0c0a09",
        headerTitleStyle: {
          color: resolvedTheme === "dark" ? "#f9fafb" : "#0c0a09",
        },
        contentStyle: {
          backgroundColor: resolvedTheme === "dark" ? "#0c0a09" : "#ffffff",
        },
      }}
      initialRouteName="(auth)/sign-up"
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/sign-up"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/sign-in"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="+not-found"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
