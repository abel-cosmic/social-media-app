import { ThemeProvider, useTheme } from "@/providers/theme-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import "react-native-reanimated";
import "../global.css";
//@ts-ignore
import logo from "@/assets/logo.png";
import { ApolloProvider } from "@/providers/apollo-context";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
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

// Loading Component
function LoadingComponent() {
  const { resolvedTheme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: resolvedTheme === "dark" ? "#0c0a09" : "#ffffff",
      }}
    >
      <ActivityIndicator
        size="large"
        color={resolvedTheme === "dark" ? "#f9fafb" : "#0c0a09"}
      />
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // Show splash screen if fonts aren't loaded or app isn't ready
  if (!fontsLoaded) {
    return <CustomSplashScreen />;
  }

  return (
    <ApolloProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </ApolloProvider>
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
      initialRouteName="index"
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
