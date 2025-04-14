import { useAuth } from "@/hooks/graphql/auth";
import { useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to sign-in if not authenticated and trying to access protected routes
      router.replace("/sign-in");
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to home if authenticated and trying to access auth routes
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, isLoading, segments, router]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" className="mt-4" color={"orange"} />
      </View>
    );
  }

  return <>{children}</>;
}
